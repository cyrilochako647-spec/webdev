(function () {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const apply = (dark) => {
    document.body.classList.toggle('dark-mode', dark);
    btn.textContent = dark ? '☀️ Light' : '🌙 Dark';
  };

  const saved = localStorage.getItem('cinemaTheme');
  apply(saved === 'dark');

  btn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    apply(!isDark);
    localStorage.setItem('cinemaTheme', !isDark ? 'dark' : 'light');
  });
})();

(function () {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach((form) => {
    form.addEventListener('input', () => {
      const old = form.querySelector('.form-alert');
      if (old) old.remove();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const old = form.querySelector('.form-alert');
      if (old) old.remove();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const msg = form.dataset.successMsg || '✓ Submitted successfully!';
      const alert = document.createElement('div');
      alert.className = 'form-alert alert alert-success mt-3';
      alert.setAttribute('role', 'alert');
      alert.textContent = msg;
      form.appendChild(alert);

      setTimeout(() => {
        form.reset();
        alert.remove();
      }, 3000);
    });
  });
})();

(function () {
  const searchInput = document.getElementById('movieSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.movie-card-wrapper');

    cards.forEach((wrapper) => {
      const title = wrapper.querySelector('h5');
      const genre = wrapper.querySelector('.badge');
      const text = ((title ? title.textContent : '') + ' ' + (genre ? genre.textContent : '')).toLowerCase();
      wrapper.style.display = text.includes(query) ? '' : 'none';
    });
  });
})();