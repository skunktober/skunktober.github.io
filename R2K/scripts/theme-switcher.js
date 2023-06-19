document.addEventListener('DOMContentLoaded', function () {
  const themeSelector = document.getElementById('theme-selector');

  function applyTheme(theme) {
    const themeStylesheet = document.getElementById('theme-stylesheet');
    themeStylesheet.href = `themes/${theme}/all.css`;
    document.body.style.backgroundImage = `url('themes/${theme}/bg.jpg')`;
  }

  function saveTheme(theme) {
    localStorage.setItem('selectedTheme', theme);
    document.cookie = `selectedTheme=${theme};path=/;max-age=31536000`; // 1 year
  }

  function loadTheme() {
    const localTheme = localStorage.getItem('selectedTheme');
    const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)selectedTheme\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    return localTheme || cookieValue || null;
  }

  const savedTheme = loadTheme();
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  if (themeSelector) {
    themeSelector.addEventListener('click', function (event) {
      const target = event.target;
      if (target.classList.contains('custom-dropdown-option')) {
        const selectedTheme = target.getAttribute('data-value');
        applyTheme(selectedTheme);
        saveTheme(selectedTheme);

        // Update the custom-dropdown-selected text
        themeSelector.querySelector('.custom-dropdown-selected').innerText = target.innerText;
      }
    });
  }
});
