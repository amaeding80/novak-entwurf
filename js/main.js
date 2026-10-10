
// Buttons im Beispiel sind nur Attrappen
(function () {
  var hinweis = document.getElementById('demo-hinweis');
  var timer;
  document.querySelectorAll('[data-demo]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      if (!hinweis) return;
      hinweis.textContent = 'Nur Vorschau: Auf Ihrer Seite würde sich hier die Terminanfrage bzw. der Anruf öffnen.';
      clearTimeout(timer);
      timer = setTimeout(function () { hinweis.textContent = ''; }, 4000);
    });
  });
})();
