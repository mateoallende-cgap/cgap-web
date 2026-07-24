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
const esc = s => (s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Formulario de contacto: envío por AJAX, confirmación sin salir de la página,
   máximo 1 consulta por día por navegador (guardado en localStorage) ---------- */
const contactoForm = document.getElementById("contactoForm");
if (contactoForm) {
  const okMsg = document.getElementById("contactoFormOk");
  const okText = document.getElementById("contactoFormOkText");
  const errMsg = document.getElementById("contactoFormErr");
  const submitBtn = contactoForm.querySelector("button[type=submit]");
  const submitTexto = submitBtn.textContent;
  const STORAGE_KEY = "cgapContactoEnviado";
  const UN_DIA_MS = 24 * 60 * 60 * 1000;
  const MSG_ENVIADO = "¡Gracias! Tu consulta se envió correctamente. Te vamos a contactar a la brevedad.";
  const MSG_BLOQUEADO = 'Ya enviaste una consulta hoy. Te vamos a responder a la brevedad — si es urgente, escribinos por <a href="https://wa.me/5493515079642" target="_blank" rel="noopener">WhatsApp</a>.';

  function bloquearFormulario(mensaje) {
    contactoForm.hidden = true;
    okText.innerHTML = mensaje;
    okMsg.hidden = false;
  }

  const ultimoEnvio = Number(localStorage.getItem(STORAGE_KEY));
  if (ultimoEnvio && Date.now() - ultimoEnvio < UN_DIA_MS) {
    bloquearFormulario(MSG_BLOQUEADO);
  }

  contactoForm.addEventListener("submit", e => {
    e.preventDefault();
    errMsg.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando…";
    fetch(contactoForm.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(contactoForm)
    })
      .then(res => { if (!res.ok) throw new Error("formsubmit error"); })
      .then(() => {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
        bloquearFormulario(MSG_ENVIADO);
      })
      .catch(() => { errMsg.hidden = false; })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = submitTexto;
      });
  });
}

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

/* ============================================================
   HOME · carrusel de reseñas (selección aleatoria)
   ============================================================ */
const revTrack = document.getElementById("revTrack");
if (revTrack && window.GOOGLE_REVIEWS) {
  const conTexto = window.GOOGLE_REVIEWS.filter(r => r.text && r.text.trim());
  const shuffled = conTexto.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const elegidas = shuffled;
  const cardsHtml = elegidas.map(r => `
    <article class="rev-card">
      <div class="rev-head">
        <div class="rev-avatar-wrap">
          <span class="rev-avatar-fallback">${iniciales(r.name)}</span>
          <img class="rev-avatar" src="${r.photoUrl || ""}" alt="" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div>
          <span class="rev-name">${esc(r.name)}</span>
          <span class="rev-date">${esc(r.date)}${r.isLocalGuide ? " · Local Guide" : ""}</span>
        </div>
      </div>
      <p class="rev-text">${esc(r.text)}</p>
      <div class="rev-stars">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div>
      <a class="rev-link" href="${r.reviewUrl}" target="_blank" rel="noopener">Ver en Google →</a>
    </article>`).join("");
  /* se duplica el set de cards para poder loopear el scroll de forma continua y sin costuras */
  revTrack.innerHTML = cardsHtml + cardsHtml;

  let mitad = revTrack.scrollWidth / 2;
  window.addEventListener("resize", () => { mitad = revTrack.scrollWidth / 2; });

  const VELOCIDAD = 0.55; // px por frame (~33px/s) — lento y continuo
  let pausadoHasta = 0;
  (function autoSlide() {
    if (Date.now() > pausadoHasta) {
      revTrack.scrollLeft += VELOCIDAD;
      if (revTrack.scrollLeft >= mitad) revTrack.scrollLeft -= mitad;
    }
    requestAnimationFrame(autoSlide);
  })();

  revTrack.closest(".carousel").querySelectorAll(".car-btn").forEach(btn => {
    btn.addEventListener("click", () => { pausadoHasta = Date.now() + 7000; });
  });
}

/* ---------- Dejar reseña en Google: ventana emergente chica sobre el sitio ---------- */
const revGoogleWriteBtn = document.getElementById("revGoogleWriteBtn");
if (revGoogleWriteBtn) {
  revGoogleWriteBtn.addEventListener("click", e => {
    e.preventDefault();
    const w = 480, h = 680;
    const left = window.screenX + (window.outerWidth - w) / 2;
    const top = window.screenY + (window.outerHeight - h) / 2;
    window.open(revGoogleWriteBtn.href, "cgapReview", `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`);
  });
}

/* ============================================================
   FAQ · buscador global (área + título + contenido) + 6 mosaicos
   por área, cada uno con su propio buscador acotado
   ============================================================ */
(function(){
  if (!window.FAQ_DATA) return;

  const DIACRITICOS_FAQ = new RegExp("[" + String.fromCharCode(0x300) + "-" + String.fromCharCode(0x36f) + "]", "g");
  const normFaq = s => (s || "").toString().toLowerCase().normalize("NFD").replace(DIACRITICOS_FAQ, "");

  const AREA_LABELS = {
    ginecologia: "Ginecología",
    institucional: "Institucional",
    diagnostico: "Diagnóstico por imágenes",
    laboratorio: "Laboratorio",
    portal: "Portal de pacientes",
    otras: "Otras especialidades"
  };

  function abrirModal(modal) { modal.classList.add("open"); document.body.style.overflow = "hidden"; }
  function cerrarModal(modal) { modal.classList.remove("open"); document.body.style.overflow = ""; }
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".modal.open").forEach(cerrarModal);
  });

  /* ---------- acordeón reutilizable (dentro del modal de categoría) ---------- */
  function renderAccordion(items) {
    if (!items.length) return `<p style="color:var(--muted);padding:.5rem 0 1rem">No encontramos preguntas con esos criterios.</p>`;
    return `<div class="faq-list">${items.map(it => `
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">
          <span>${it.titulo}</span>
          <span class="faq-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 9l6 6 6-6"/></svg></span>
        </button>
        <div class="faq-a"><div><p>${it.contenido}</p></div></div>
      </div>`).join("")}</div>`;
  }
  const faqScrollHintHtml = '<span class="faq-scroll-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 9l6 6 6-6"/></svg></span>';
  /* El alto máximo de la card (.modal-card--wide{max-height:85vh}) + que
     .faq-cat-body sea flex:1 con overflow-y:auto es lo que garantiza el
     recorte y el scroll — es CSS puro, no depende de medir nada por JS.
     Acá solo prendemos/apagamos la flecha de "hay más" según el scroll. */
  function setupFaqScroll(cardEl) {
    const body = cardEl.querySelector(".faq-cat-body");
    if (!body) { cardEl.classList.remove("has-more", "at-bottom"); return; }
    const actualizar = () => {
      const hayMas = body.scrollHeight > body.clientHeight + 2;
      const alFinal = body.scrollTop + body.clientHeight >= body.scrollHeight - 2;
      cardEl.classList.toggle("has-more", hayMas);
      cardEl.classList.toggle("at-bottom", hayMas && alFinal);
    };
    body.addEventListener("scroll", actualizar);
    actualizar();
  }
  function wireAccordion(container) {
    container.querySelectorAll(".faq-q").forEach(btn => {
      btn.addEventListener("click", () => {
        const answer = btn.closest(".faq-item").querySelector(".faq-a");
        const isOpen = btn.getAttribute("aria-expanded") === "true";
        container.querySelectorAll('.faq-q[aria-expanded="true"]').forEach(other => {
          if (other === btn) return;
          other.setAttribute("aria-expanded", "false");
          other.closest(".faq-item").querySelector(".faq-a").classList.remove("open");
        });
        btn.setAttribute("aria-expanded", String(!isOpen));
        answer.classList.toggle("open", !isOpen);
      });
    });
  }

  /* ---------- modal de una sola respuesta (resultado del buscador general) ---------- */
  const faqAnswerModal = document.getElementById("faqAnswerModal");
  const faqAnswerCard = faqAnswerModal ? faqAnswerModal.querySelector(".modal-card") : null;
  function abrirRespuesta(item) {
    if (!faqAnswerCard) return;
    faqAnswerCard.innerHTML = `
      <button class="close" aria-label="Cerrar">×</button>
      <span class="tag">${AREA_LABELS[item.area] || item.area}</span>
      <h3>${item.titulo}</h3>
      <p class="desc">${item.contenido}</p>`;
    faqAnswerCard.querySelector(".close").addEventListener("click", () => cerrarModal(faqAnswerModal));
    abrirModal(faqAnswerModal);
  }
  if (faqAnswerModal) {
    faqAnswerModal.addEventListener("click", e => { if (e.target === faqAnswerModal) cerrarModal(faqAnswerModal); });
  }

  /* ---------- buscador general ---------- */
  const faqSearch = document.getElementById("faqSearch");
  const faqSearchClear = document.getElementById("faqSearchClear");
  const faqSearchResults = document.getElementById("faqSearchResults");
  if (faqSearch && faqSearchResults && faqSearchClear) {
    function buscarGlobal() {
      const q = normFaq(faqSearch.value);
      faqSearchClear.classList.toggle("show", !!faqSearch.value);
      if (!q) { faqSearchResults.classList.remove("show"); faqSearchResults.innerHTML = ""; return; }
      const res = window.FAQ_DATA.filter(it =>
        normFaq(it.area).includes(q) || normFaq(it.titulo).includes(q) || normFaq(it.contenido).includes(q)
      ).slice(0, 8);
      faqSearchResults.innerHTML = res.length
        ? res.map(it => `<button type="button" data-i="${window.FAQ_DATA.indexOf(it)}">${it.titulo}<span class="area-tag">${AREA_LABELS[it.area] || it.area}</span></button>`).join("")
        : `<div class="empty">No encontramos preguntas con esos criterios.</div>`;
      faqSearchResults.querySelectorAll("button[data-i]").forEach(b => {
        b.addEventListener("click", () => {
          abrirRespuesta(window.FAQ_DATA[b.dataset.i]);
          faqSearchResults.classList.remove("show");
        });
      });
      faqSearchResults.classList.add("show");
    }
    faqSearch.addEventListener("input", buscarGlobal);
    faqSearch.addEventListener("focus", () => { if (faqSearch.value) faqSearchResults.classList.add("show"); });
    faqSearchClear.addEventListener("click", () => { faqSearch.value = ""; buscarGlobal(); faqSearch.focus(); });
    document.addEventListener("click", e => {
      if (!e.target.closest(".faq-search-wrap")) faqSearchResults.classList.remove("show");
    });
  }

  /* ---------- mosaicos por área ---------- */
  const faqCategoryModal = document.getElementById("faqCategoryModal");
  const faqCategoryCard = faqCategoryModal ? faqCategoryModal.querySelector(".modal-card") : null;
  document.querySelectorAll(".faq-tile").forEach(tile => {
    tile.addEventListener("click", () => {
      if (!faqCategoryCard) return;
      const area = tile.dataset.area;
      const label = AREA_LABELS[area] || area;
      const items = window.FAQ_DATA.filter(it => it.area === area);

      faqCategoryCard.innerHTML = `
        <button class="close" aria-label="Cerrar">×</button>
        <h3>${label}</h3>
        <div class="faq-cat-body">
          <div class="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            <input type="text" placeholder="Buscar dentro de ${label}…" aria-label="Buscar en ${label}">
            <button class="clear" type="button" aria-label="Limpiar">×</button>
          </div>
          <div class="faq-cat-list">${renderAccordion(items)}</div>
        </div>
        ${faqScrollHintHtml}`;

      faqCategoryCard.querySelector(".close").addEventListener("click", () => cerrarModal(faqCategoryModal));
      wireAccordion(faqCategoryCard.querySelector(".faq-cat-list"));

      const catInput = faqCategoryCard.querySelector(".search-box input");
      const catClear = faqCategoryCard.querySelector(".search-box .clear");
      catInput.addEventListener("input", () => {
        const q = normFaq(catInput.value);
        catClear.classList.toggle("show", !!catInput.value);
        const filtrados = items.filter(it => normFaq(it.titulo).includes(q) || normFaq(it.contenido).includes(q));
        const catList = faqCategoryCard.querySelector(".faq-cat-list");
        catList.innerHTML = renderAccordion(filtrados);
        wireAccordion(catList);
        setupFaqScroll(faqCategoryCard);
      });
      catClear.addEventListener("click", () => { catInput.value = ""; catInput.dispatchEvent(new Event("input")); });

      abrirModal(faqCategoryModal);
      setupFaqScroll(faqCategoryCard);
    });
  });
  if (faqCategoryModal) {
    faqCategoryModal.addEventListener("click", e => { if (e.target === faqCategoryModal) cerrarModal(faqCategoryModal); });
  }
})();

/* ============================================================
   Servicios principales · modal por card (uno distinto cada una)
   ============================================================ */
(function(){
  const modal = document.getElementById('prestModal');
  if (!modal) return;
  const card = modal.querySelector('.modal-card');

  const waTexto = t => `https://wa.me/5493515079642?text=${encodeURIComponent(t)}`;
  const waTextoEstetica = t => `https://wa.me/5493515079519?text=${encodeURIComponent(t)}`;
  const waIcon = '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7s1.9 2.9 4.6 4c1.7.7 2.3.8 3.1.7.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z"/></svg>';
  const portalIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9z"/></svg>';

  const CONTENIDO = {
    gineco: {
      title: 'Consultas y estudios',
      desc: 'Atención médica especializada para controles, diagnóstico y seguimiento de distintas especialidades, acompañándote en cada etapa.',
      extra: `<div class="modal-info">
        <p>Para turnos de <b>consulta</b> podés reservar a través del <a href="https://pacientes.cgap.com.ar/Login" target="_blank" rel="noopener">portal de pacientes</a> o por <b>WhatsApp</b>.</p>
        <p>Para <b>estudios o prácticas</b>, los turnos se coordinan únicamente por <b>WhatsApp</b>.</p>
        <p>Conocé todas nuestras <a href="pages/practicas.html">especialidades</a> y las <a href="#obras-sociales" data-scroll-close>obras sociales</a> con las que trabajamos.</p>
      </div>`,
      ctaText: 'Solicitar turno por WhatsApp',
      ctaHref: waTexto('Hola, buen día. Me gustaría sacar un turno.'),
      blank: true,
      wa: true
    },
    eco: {
      title: 'Diagnóstico por imágenes',
      desc: 'Ecografías y estudios especializados según indicación médica, con equipamiento de alta precisión.',
      extra: `<div class="modal-info">
        <p>Ofrecemos una <a href="pages/practicas.html"><b>gran variedad de ecografías</b></a>. Podés ver todas las opciones, junto con los <a href="pages/practicas.html"><b>requerimientos y la preparación</b></a> de cada una, en el apartado de especialidades.</p>
        <p>Los turnos para estos estudios se pueden sacar desde el <a href="https://pacientes.cgap.com.ar/Login" target="_blank" rel="noopener">portal de pacientes</a> o por <b>WhatsApp</b>.</p>
      </div>`,
      ctaText: 'Consultar por WhatsApp',
      ctaHref: waTexto('Hola, buen día. Quiero sacar un turno para realizarme una ecografía.'),
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
      ctaHref: waTextoEstetica('Hola buen día. Quisiera sacar un turno para estética.'),
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
