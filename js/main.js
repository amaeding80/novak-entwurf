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
  var texte = {
    kurse: 'Nur Vorschau: Hier käme man zur Übersicht Ihrer Workshops und Online-Kurse.',
    anfrage: 'Nur Vorschau: Hier würde sich das Anfrageformular öffnen.'
  };
  var timer;
  document.querySelectorAll('[data-demo]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      if (!hinweis) return;
      hinweis.textContent = texte[el.getAttribute('data-demo')] || 'Nur Vorschau.';
      clearTimeout(timer);
      timer = setTimeout(function () { hinweis.textContent = ''; }, 4000);
    });
  });
})();

// Einblenden beim Scrollen
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('sichtbar'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('sichtbar');
        io.unobserve(en.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach(function (el) { io.observe(el); });

  // sticky Buttons ausblenden wenn Kontakt-Bereich zu sehen ist
  var sticky = document.getElementById('sticky');
  var kontakt = document.getElementById('kontakt');
  if (sticky && kontakt) {
    new IntersectionObserver(function (entries) {
      sticky.classList.toggle('weg', entries[0].isIntersecting);
    }, { threshold: 0.15 }).observe(kontakt);
  }
})();
