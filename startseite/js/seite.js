// Startseite Entwurf Novak

// Menü auf/zu
(function () {
  var btn = document.querySelector('.burger');
  var menue = document.getElementById('hauptmenue');
  if (!btn || !menue) return;
  btn.addEventListener('click', function () {
    var auf = menue.classList.toggle('offen');
    btn.setAttribute('aria-expanded', auf ? 'true' : 'false');
  });
  // nach Klick auf einen Punkt wieder zu
  menue.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menue.classList.remove('offen');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Attrappen - auf der Vorschau wird nichts verschickt
(function () {
  var hinweis = document.getElementById('hinweis');
  var texte = {
    seite: 'Nur Vorschau: Hier käme man zur passenden Unterseite.',
    english: 'Nur Vorschau: Hier käme die englische Seite.',
    video: 'Nur Vorschau: Das Video käme auf der Therablog-Seite.',
    mail: 'Nur Vorschau: Hier würde sich Ihr E-Mail-Programm öffnen.',
    recht: 'Nur Vorschau: Hier käme Ihr Impressum bzw. die Datenschutzerklärung.'
  };
  var timer;
  function zeigen(el) {
    if (!hinweis) return;
    hinweis.textContent = texte[el.getAttribute('data-demo')] || 'Nur Vorschau.';
    hinweis.classList.add('an');
    clearTimeout(timer);
    timer = setTimeout(function () { hinweis.classList.remove('an'); }, 3500);
  }
  document.querySelectorAll('[data-demo]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      zeigen(el);
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && el.tagName !== 'A') { e.preventDefault(); zeigen(el); }
    });
  });
})();

// Formular nur Vorschau - nichts wird gesendet
(function () {
  var form = document.getElementById('anfrage-form');
  var hinweis = document.getElementById('hinweis');
  if (!form) return;
  // Nachtrag: Warteliste-Link wählt das Anliegen gleich vor
  document.querySelectorAll('[data-anliegen]').forEach(function (a) {
    a.addEventListener('click', function () {
      form.querySelector('select').value = a.getAttribute('data-anliegen');
    });
  });
  var timer;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    hinweis.textContent = 'Nur Vorschau: Die Anfrage wird hier nicht verschickt.';
    hinweis.classList.add('an');
    clearTimeout(timer);
    timer = setTimeout(function () { hinweis.classList.remove('an'); }, 3500);
  });
})();

// Wisch-Leisten auf dem Handy (Kurse + Therapie) - Hinweis drunter umschalten, auch klickbar
document.querySelectorAll('.wisch-hinweis').forEach(function (btn) {
  var liste = document.getElementById(btn.getAttribute('aria-controls'));
  if (!liste) return;
  function amEnde() {
    return liste.scrollLeft + liste.clientWidth >= liste.scrollWidth - 8;
  }
  function update() {
    btn.textContent = amEnde() ? '\u2190 zurück' : 'nach rechts wischen \u2192';
  }
  var t;
  liste.addEventListener('scroll', function () {
    clearTimeout(t);
    t = setTimeout(update, 80);
  }, { passive: true });
  btn.addEventListener('click', function () {
    var karte = liste.firstElementChild;
    var schritt = karte ? karte.getBoundingClientRect().width + 14 : liste.clientWidth;
    if (amEnde()) liste.scrollTo({ left: 0, behavior: 'smooth' });
    else liste.scrollBy({ left: schritt, behavior: 'smooth' });
  });
  update();
});

// Einblenden beim Scrollen
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('sichtbar'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('sichtbar'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();
