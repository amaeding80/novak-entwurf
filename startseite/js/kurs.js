// Beispiel-Kursseite: Kursdaten von ihren Kursseiten, Preis bewusst offen
var KURSE = {
  'me-cfs': {
    bild: 'buteyko-me-cfs',
    start: '7. Dezember 2026',
    titel: 'Buteyko-Atemkurs bei ME/CFS',
    sub: 'Sanfte Atemregulation im Einklang mit Pacing.',
    intro: 'Sie lernen in einer Kleingruppe von max. 5 TeilnehmerInnen Atemtechniken, die speziell an die geringe Belastungsgrenze bei ME/CFS angepasst sind und strikt den Prinzipien von Pacing folgen.',
    fakten: [
      ['Format', 'Online-Kurs bequem und stressfrei von zu Hause aus'],
      ['Termine', '7./14./21./28. Dezember + 10. Januar 2027'],
      ['Uhrzeit', '19–21 Uhr'],
      ['Gruppe', 'Begrenzt auf 5 Personen'],
      ['Voraussetzung', 'Ausfüllen des Anamnese- und Anmeldebogens vor Beginn']
    ],
    inhalte: [
      'Fundierte Theorie & Praxis: Verständliche Erklärung der Buteyko-Physiologie bezogen auf das Nervensystem und ME/CFS.',
      'Praktische Begleitung: Regelmäßige Online-Gruppensessions mit Raum für Fragen und Erfahrungsaustausch.',
      'Kursmaterialien: Begleitende Unterlagen und sanfte Übungsanleitungen für zu Hause.',
      'Sicherer Rahmen: Professionelle Betreuung durch Dipl.-Psych. Pavithra Novak.'
    ],
    hinweis: 'Der Kurs bietet eine therapeutisch begleitete Atemregulation. Er ersetzt keine ärztliche Diagnostik oder medizinische Behandlung.',
    extra: 'Nächster Schritt wäre der Anamnese- und Anmeldebogen, der vor Beginn ausgefüllt wird.'
  },
  'resilienz': {
    bild: 'resilienz',
    start: '7. Januar 2027',
    titel: 'Ganzheitliche Resilienz',
    sub: 'Ein Online-Kurs mit 7 Modulen à 2 Stunden.',
    intro: 'Bei diesem Kurs handelt es sich um einen kompletten Online-Live-Kurs, bei dem ich jedes Mal anwesend bin.',
    fakten: [
      ['Format', 'Online-Live-Kurs, per Audio aufgezeichnet'],
      ['Termine', '7.1., 21.1., 4.2., 18.2., 4.3., 18.3., 1.4.2027'],
      ['Uhrzeit', '19:00–21:00 Uhr']
    ],
    inhalte: [
      'Das Fundament – Traumatherapie & Nervensystem',
      'Die Präsenz – Achtsamkeit, Atmung & Mentale Klarheit',
      'Die Abgrenzung – Grenzziehung & Energiemanagement',
      'Die Abwehrkraft – Darmgesundheit & Mikrobiom',
      'Die Energie – Nährstoffversorgung & Biochemie',
      'Die Langlebigkeit – Funktionelle Bewegung & Longevity',
      'Die Integration – Q&A, Transfer & Offene Fragen'
    ]
  }
};

(function () {
  var $ = function (id) { return document.getElementById(id); };
  var aktTitel = $('k-titel').textContent;

  // Kurs per ?kurs= tauschen
  var m = location.search.match(/kurs=([a-z-]+)/);
  var k = m && KURSE[m[1]];
  if (k) {
    $('k-bild').src = '../../img/' + k.bild + '.jpg';
    $('k-bild-webp').srcset = '../../img/' + k.bild + '.webp';
    $('k-start').textContent = 'Start: ' + k.start;
    $('k-titel').textContent = k.titel;
    $('k-sub').textContent = k.sub;
    $('k-intro').textContent = k.intro;
    var dl = $('k-fakten');
    dl.innerHTML = '';
    k.fakten.forEach(function (f) {
      var dt = document.createElement('dt'); dt.textContent = f[0];
      var dd = document.createElement('dd'); dd.textContent = f[1];
      dl.appendChild(dt); dl.appendChild(dd);
    });
    var ul = $('k-inhalte');
    ul.innerHTML = '';
    k.inhalte.forEach(function (t) {
      var li = document.createElement('li'); li.textContent = t; ul.appendChild(li);
    });
    if (k.hinweis) { $('k-hinweis').textContent = k.hinweis; $('k-hinweis').hidden = false; }
    if (k.extra) { $('z-extra').textContent = k.extra; $('z-extra').hidden = false; }
    document.querySelectorAll('.js-start').forEach(function (el) { el.textContent = k.start; });
    document.querySelectorAll('.js-titel').forEach(function (el) { el.textContent = k.titel; });
    document.title = k.titel + ' – Pavithra Novak (Beispiel-Kursseite)';
    aktTitel = k.titel;
    // Menü: Resilienz-Kurs markieren statt Buteyko
    if (m[1] === 'resilienz') {
      var links = document.querySelectorAll('.menue a');
      links.forEach(function (a) { a.removeAttribute('aria-current'); });
      links[1].setAttribute('aria-current', 'page');
    }
  }

  // Buchung in 3 Schritten - nichts wird verschickt
  var s1 = $('schritt-1'), s2 = $('schritt-2'), s3 = $('schritt-3');
  function zeige(s) {
    [s1, s2, s3].forEach(function (x) { x.hidden = (x !== s); });
  }
  s1.addEventListener('submit', function (e) {
    e.preventDefault();
    $('z-name').textContent = $('b-name').value.trim() || '–';
    $('z-zahlung').textContent = s1.querySelector('input[name=zahlung]:checked').value === 'online' ? 'Online' : 'Per Überweisung';
    zeige(s2);
  });
  $('b-zurueck').addEventListener('click', function () { zeige(s1); });
  $('b-buchen').addEventListener('click', function () {
    var name = $('b-name').value.trim();
    $('z-danke').textContent = 'Vielen Dank' + (name ? ', ' + name : '') + '! Ihr Platz im Kurs „' + aktTitel + '“ ist gebucht. Eine Bestätigung mit allen Terminen kommt automatisch per E-Mail.';
    zeige(s3);
    s3.focus();
    var h = $('hinweis');
    h.textContent = 'Nur Vorschau: Es wurde nichts gebucht und nichts bezahlt.';
    h.classList.add('an');
    setTimeout(function () { h.classList.remove('an'); }, 3500);
  });
  $('b-neu').addEventListener('click', function () { zeige(s1); });
})();
