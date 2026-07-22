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

/* ============================================================
   Servicios principales · modal por card (uno distinto cada una)
   ============================================================ */
(function(){
  const modal = document.getElementById('prestModal');
  if (!modal) return;
  const card = modal.querySelector('.modal-card');

  const waTexto = t => `https://wa.me/5493515079642?text=${encodeURIComponent(t)}`;
  const waIcon = '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7s1.9 2.9 4.6 4c1.7.7 2.3.8 3.1.7.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z"/></svg>';
  const portalIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9z"/></svg>';

  const CONTENIDO = {
    gineco: {
      title: 'Consultas y estudios',
      desc: 'Atención médica especializada para controles, diagnóstico y seguimiento de distintas especialidades, acompañándote en cada etapa.',
      extra: `<div class="modal-info">
        <p>Para turnos de <b>consulta</b> podés reservar a través del <a href="https://pacientes.cgap.com.ar/Login" target="_blank" rel="noopener">portal de pacientes</a> o por <b>WhatsApp</b>.</p>
        <p>Para <b>estudios o prácticas</b>, los turnos se coordinan únicamente por WhatsApp.</p>
        <p>Conocé todas nuestras <a href="pages/practicas.html">especialidades</a> y las <a href="#obras-sociales" data-scroll-close>obras sociales</a> con las que trabajamos.</p>
      </div>`,
      ctaText: 'Solicitar turno por WhatsApp',
      ctaHref: waTexto('Hola, quisiera solicitar un turno ginecológico.'),
      blank: true,
      wa: true
    },
    eco: {
      title: 'Diagnóstico por imágenes',
      desc: 'Ecografías y estudios especializados según indicación médica, con equipamiento de alta precisión.',
      extra: `<div class="modal-info">
        <p>Ofrecemos una <b>gran variedad de ecografías</b>. Podés ver todas las opciones, junto con los <b>requerimientos y la preparación</b> de cada una, en el apartado de <a href="pages/practicas.html">especialidades</a>.</p>
        <p>Los turnos para estos estudios se pueden sacar desde el <a href="https://pacientes.cgap.com.ar/Login" target="_blank" rel="noopener">portal de pacientes</a> o por <b>WhatsApp</b>.</p>
      </div>`,
      ctaText: 'Consultar por WhatsApp',
      ctaHref: waTexto('Hola, quisiera consultar sobre una ecografía.'),
      blank: true,
      wa: true
    },
    labo: {
      title: 'Análisis de laboratorio',
      desc: 'Trabajamos junto con especialistas de <span style="color:#1f8a4c;font-weight:700">LACE</span> para que puedas realizar tus estudios de laboratorio de forma simple y ordenada.',
      extra: `<div class="modal-info">
        <p><b>No es necesario solicitar turno</b>: podés acercarte de <b>7 a 11 hs de lunes a viernes</b> para realizar tus estudios.</p>
        <p>Si necesitás más información, comunicate con nosotros.</p>
      </div>`,
      ctaText: 'Consultar por WhatsApp',
      ctaHref: waTexto('Hola, quisiera más información sobre análisis de laboratorio.'),
      blank: true,
      wa: true
    },
    estetica: {
      title: 'Medicina estética',
      desc: 'Tratamientos faciales y corporales con evaluación profesional y aparatología avanzada.',
      extra: `<div class="modal-info">
        <p>Podés revisar toda la <b>variedad de estudios</b> que realizamos desde nuestro apartado de <a href="pages/medicina-estetica.html">estética</a>, junto con los <b>equipos especializados</b> que tenemos.</p>
        <p>Todos los turnos para estética se realizan a través de <b>WhatsApp</b>, comunicate con nosotros.</p>
      </div>`,
      ctaText: 'Consultar por WhatsApp',
      ctaHref: waTexto('Hola, quisiera más información sobre medicina estética.'),
      blank: true,
      wa: true
    },
    estudios: {
      title: 'Acceso a estudios online',
      desc: 'Consultá tus turnos, resultados y estudios desde el portal de pacientes, disponible las 24 hs.',
      extra: `<div class="modal-info">
        <p>Si es tu <b>primera vez</b>, podés <b>crear una cuenta</b> ingresando tus datos para solicitar un turno.</p>
        <p>Si ya te has atendido, ingresá con tu <b>DNI</b> como usuario y contraseña.</p>
      </div>`,
      ctaText: 'Ingresar al portal',
      ctaHref: 'https://pacientes.cgap.com.ar/Login',
      blank: true,
      portal: true
    },
    recetas: {
      title: 'Recetas y órdenes digitales',
      desc: 'Accedé a recetas, órdenes médicas e indicaciones de manera digital, desde cualquier lugar.',
      extra: `<div class="modal-info">
        <p>Al asistir a una consulta o estudio, todas las <b>recetas de medicamentos</b> o <b>estudios de laboratorio</b> que te soliciten nuestros médicos te serán enviados a tu <b>mail y WhatsApp</b> para tu conveniencia.</p>
      </div>`,
      ctaText: 'Gestionar online',
      ctaHref: 'https://pacientes.cgap.com.ar/Login',
      blank: true,
      portal: true
    }
  };

  function abrir(key) {
    const d = CONTENIDO[key];
    if (!d) return;
    const rows = (d.rows || []).map(([b, v]) => `<div class="modal-row"><b>${b}</b><span>${v}</span></div>`).join('');
    card.innerHTML = `
      <button class="close" aria-label="Cerrar">×</button>
      <h3>${d.title}</h3>
      <p class="desc">${d.desc}</p>
      ${d.extra || rows}
      <a class="btn${d.wa ? ' btn-whatsapp' : ''}" href="${d.ctaHref}"${d.blank ? ' target="_blank" rel="noopener"' : ''}>${d.wa ? waIcon : d.portal ? portalIcon : ''}${d.ctaText}</a>`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    card.querySelector('.close').addEventListener('click', cerrar);
    card.querySelectorAll('[data-scroll-close]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        cerrar();
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function cerrar() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      abrir(el.dataset.modal);
    });
  });

  modal.addEventListener('click', e => { if (e.target === modal) cerrar(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
})();
