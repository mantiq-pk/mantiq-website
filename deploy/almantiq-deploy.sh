#!/usr/bin/env bash
# Forced command for the CI deploy key (authorized_keys: command="...",restrict).
# Usage over SSH:  <gzipped `docker save almantiq-website:<tag>` on stdin>  with the tag as the
# SSH command (arrives in SSH_ORIGINAL_COMMAND). It only loads that image, points ALMANTIQ_TAG at
# it, recreates the almantiq-website service alone (--no-deps) and rolls back to the previous
# tag if the site does not answer correctly.
# Install on the AWS server at ~/ilma/almantiq-deploy.sh (owned by the login user, mode 0755).
set -euo pipefail
umask 077

ROOT="${ILMA_ROOT:-$HOME/ilma}"
COMPOSE=(docker compose -f docker-compose.vps.yml)
SERVICE=almantiq-website
TAG="${SSH_ORIGINAL_COMMAND:-}"

if [[ ! "$TAG" =~ ^[0-9a-f]{7,40}$ ]]; then
  echo "refused: tag must be 7-40 lowercase hex characters" >&2
  exit 2
fi

cd "$ROOT"
exec 9>"$ROOT/.almantiq-deploy.lock"
flock -n 9 || { echo "refused: another website deploy is running" >&2; exit 3; }

set_tag() {
  local tag="$1" tmp
  tmp="$(mktemp)"
  if grep -q '^ALMANTIQ_TAG=' .env; then
    sed "s/^ALMANTIQ_TAG=.*/ALMANTIQ_TAG=${tag}/" .env >"$tmp"
  else
    { cat .env; echo "ALMANTIQ_TAG=${tag}"; } >"$tmp"
  fi
  cat "$tmp" >.env   # in place: keeps owner, mode and every other line
  rm -f "$tmp"
}

recreate() { "${COMPOSE[@]}" up -d --no-deps --force-recreate "$SERVICE" >/dev/null; }

# Healthy = the container runs the wanted image and nginx answers 2xx for / and /contact.
wait_serving() {
  local want="$1" id image i
  for i in $(seq 1 30); do
    id="$("${COMPOSE[@]}" ps -q "$SERVICE" 2>/dev/null || true)"
    if [[ -n "$id" ]]; then
      image="$(docker inspect --format '{{.Config.Image}}' "$id" 2>/dev/null || true)"
      if [[ "$image" == "almantiq-website:${want}" ]] \
        && docker exec "$id" wget -q -O /dev/null http://127.0.0.1:8080/ \
        && docker exec "$id" wget -q -O /dev/null http://127.0.0.1:8080/contact; then
        return 0
      fi
    fi
    sleep 2
  done
  return 1
}

PREV="$(sed -n 's/^ALMANTIQ_TAG=//p' .env | head -n1)"

head -c 2147483648 | docker load >/dev/null
docker image inspect "almantiq-website:${TAG}" >/dev/null

set_tag "$TAG"
if recreate && wait_serving "$TAG"; then
  echo "deployed almantiq-website:${TAG} (previous: ${PREV:-none}); serving"
  exit 0
fi

echo "website ${TAG} did not serve correctly" >&2
if [[ -n "$PREV" && "$PREV" != "$TAG" ]]; then
  set_tag "$PREV"
  recreate || true
  if wait_serving "$PREV"; then echo "rolled back to ${PREV}; serving" >&2; else echo "ROLLBACK to ${PREV} is not serving either" >&2; fi
fi
exit 1
