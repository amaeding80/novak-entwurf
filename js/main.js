// Kontaktdaten - hier ändern, gilt für alle Buttons auf der Seite
var KONTAKT_MAIL = 'anfrage@praxisecht.de';
var WHATSAPP_NR = '4917643433973';
var WA_TEXT = 'Hallo Herr Mäding, ich habe mir Ihre Analyse zu meiner Website angesehen und hätte gern mehr Informationen.';
var MAIL_BETREFF = 'Website-Analyse pavithranovak.net';

(function () {
  var mailHref = 'mailto:' + KONTAKT_MAIL + '?subject=' + encodeURIComponent(MAIL_BETREFF);
  var waHref = 'https://wa.me/' + WHATSAPP_NR + '?text=' + encodeURIComponent(WA_TEXT);

  document.querySelectorAll('.js-mail').forEach(function (a) {
    a.href = mailHref;
  });
  document.querySelectorAll('.js-mail-text').forEach(function (a) {
    a.textContent = KONTAKT_MAIL;
  });
  document.querySelectorAll('.js-wa').forEach(function (a) {
    a.href = waHref;
    a.target = '_blank';
    a.rel = 'noopener';
  });
})();

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
