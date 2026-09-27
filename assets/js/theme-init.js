(() => {
  const storageKey = 'mantiq-color-theme';
  let theme = 'dark';

  try {
    if (localStorage.getItem(storageKey) === 'light') theme = 'light';
  } catch (_) {
    // Dark remains the safe default when storage is unavailable.
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
})();
