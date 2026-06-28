(function () {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  if (localStorage.getItem('cinemax-theme') === 'light') {
    document.body.classList.add('light-mode');
    toggle.textContent = '☀️ Light';
  } else {
    toggle.textContent = '🌙 Dark';
  }

  toggle.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('cinemax-theme', isLight ? 'light' : 'dark');
    toggle.textContent = isLight ? '☀️ Light' : '🌙 Dark';
  });
})();

(function () {
  const forms = document.querySelectorAll('form[data-validate]');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
      form.querySelectorAll('.error-msg').forEach(el => el.remove());

      form.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          markInvalid(field, 'This field is required.');
          valid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
          markInvalid(field, 'Please enter a valid email address.');
          valid = false;
        } else if (field.type === 'password' && field.value.length < 6) {
          markInvalid(field, 'Password must be at least 6 characters.');
          valid = false;
        }
      });

      const pass = form.querySelector('#password');
      const confirm = form.querySelector('#confirm_password');

      if (pass && confirm && pass.value && confirm.value && pass.value !== confirm.value) {
        markInvalid(confirm, 'Passwords do not match.');
        valid = false;
      }

      if (valid) {
        showSuccess(form);
      }
    });
  });

  function markInvalid(field, message) {
    field.classList.add('is-invalid');
    const msg = document.createElement('div');
    msg.className = 'invalid-feedback error-msg';
    msg.textContent = message;
    field.parentNode.appendChild(msg);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showSuccess(form) {
    const existing = form.querySelector('.success-alert');
    if (existing) existing.remove();

    const alert = document.createElement('div');
    alert.className = 'alert alert-success mt-3 success-alert';
    alert.textContent = form.dataset.successMsg || '✓ Submitted successfully!';
    form.appendChild(alert);

    setTimeout(() => {
      form.reset();
      alert.remove();
    }, 3000);
  }
})();

(function () {
  const searchInput = document.getElementById('movieSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();

    document.querySelectorAll('.movie-card-wrapper').forEach(function (card) {
      const title = card.querySelector('h5').textContent.toLowerCase();
      card.style.display = title.includes(query) ? '' : 'none';
    });
  });
})();