/* ============================================================
   CGAP · index.js (solo Home)
   Requiere: global.js, data.js (window.PROFESIONALES)
   ============================================================ */

/* ---------- Carruseles (botones ‹ ›) ---------- */
document.querySelectorAll(".car-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const t = document.getElementById(btn.dataset.target);
    if (!t) return;
    const card = t.querySelector("article,.doc-card,.nov-card");
    const step = card ? card.offsetWidth + 20 : 260;
    t.scrollBy({ left: btn.classList.contains("next") ? step : -step, behavior: "smooth" });
  });
});

/* ---------- Helpers ---------- */
const iniciales = n => n.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();

/* ============================================================
   HOME · especialistas destacados + novedades
   ============================================================ */
const docTrack = document.getElementById("docTrack");
if (docTrack && window.PROFESIONALES) {
  const destacados = window.PROFESIONALES.filter(p => p.destacado).slice(0, 10);
  const lista = destacados.length ? destacados : window.PROFESIONALES.slice(0, 8);
  docTrack.innerHTML = lista.map(p => `
    <article class="doc-card">
      <div class="doc-photo"><span>${iniciales(p.nombre + " " + p.apellido)}</span></div>
      <h3>${p.nombre} ${p.apellido}</h3>
      <p class="esp">${p.especialidadTexto}</p>
      <span class="hor">Horario: ${p.horario}</span>
    </article>`).join("");
}

const novTrack = document.getElementById("novTrack");
if (novTrack) {
  const novedades = [
    { tag: "Prevención", txt: "La importancia del control ginecológico anual." },
    { tag: "Salud", txt: "Todo sobre el circuito ginecológico en un solo día." },
    { tag: "Estética", txt: "Cuidados de la piel en cada etapa de la mujer." },
    { tag: "Tips", txt: "Cómo prepararte para tu ecografía." }
  ];
  const igIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>`;
  novTrack.innerHTML = novedades.map(n => `
    <article class="nov-card">
      <div class="nov-img">${igIcon}</div>
      <div class="nov-body"><small>${n.tag}</small><p>${n.txt}</p></div>
    </article>`).join("");
}

/* ---------- FAQ tabs + acordeón ---------- */
(function(){
  /* tabs */
  const tabs = document.querySelectorAll('.faq-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.faq-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById('faq-' + tab.dataset.tab);
      panel.classList.add('active');
      panel.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    });
  });

  /* acordeón */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const inner = answer.querySelector('div') || answer;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      /* cerrar todos los abiertos en el mismo panel */
      btn.closest('.faq-list').querySelectorAll('.faq-q[aria-expanded="true"]').forEach(other => {
        if (other === btn) return;
        other.setAttribute('aria-expanded', 'false');
        other.closest('.faq-item').querySelector('.faq-a').classList.remove('open');
      });

      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.classList.toggle('open', !isOpen);
    });
  });
})();

/* ---------- Hero Slider ---------- */
(function(){
  const slides = document.querySelectorAll('.hs-slide');
  const dots   = document.querySelectorAll('.hs-dot');
  if (!slides.length) return;

  // Colores del ticker según slide (deben coincidir con los gradientes)
  const tickerColors = ['#f5cde8', '#f5cde8', '#c8dff7'];
  const ticker = document.querySelector('.ticker-wrap');

  let current = 0;
  let timer;

  function updateTicker(idx) {
    if (!ticker) return;
    ticker.style.transition = 'background .9s ease';
    ticker.style.background = tickerColors[idx] || tickerColors[0];
  }

  function goTo(n) {
    const prev = current;
    current = (n + slides.length) % slides.length;
    if (prev === current) return;
    slides[prev].classList.remove('active');
    slides[prev].classList.add('leaving');
    dots[prev].classList.remove('active');
    setTimeout(() => slides[prev].classList.remove('leaving'), 950);
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    updateTicker(current);
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 6000);
  }

  document.querySelector('.hs-next')?.addEventListener('click', () => { goTo(current + 1); startAuto(); });
  document.querySelector('.hs-prev')?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  dots.forEach(dot => dot.addEventListener('click', () => { goTo(+dot.dataset.slide); startAuto(); }));

  updateTicker(0);
  startAuto();
})();
