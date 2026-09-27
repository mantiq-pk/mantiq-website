(() => {
  const storageKey = 'mantiq-color-theme';
  const root = document.documentElement;
  const toggle = document.querySelector('[data-theme-toggle]');

  if (!toggle) return;

  const icon = toggle.querySelector('.theme-toggle__icon');
  const label = toggle.querySelector('.theme-toggle__text');

  function currentTheme() {
    return root.dataset.theme === 'light' ? 'light' : 'dark';
  }

  function render(theme) {
    const isDark = theme === 'dark';
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    icon.textContent = isDark ? '☾' : '☀';
    label.textContent = isDark ? 'Dark' : 'Light';
  }

  toggle.addEventListener('click', () => {
    const nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
    render(nextTheme);
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch (_) {
      // The toggle still works for the current page when storage is unavailable.
    }
  });

  window.addEventListener('storage', event => {
    if (event.key === storageKey && (event.newValue === 'dark' || event.newValue === 'light')) {
      render(event.newValue);
    }
  });

  render(currentTheme());
  requestAnimationFrame(() => root.classList.add('theme-ready'));
})();
