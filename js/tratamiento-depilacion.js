/* ============================================================
   CGAP · tratamiento-depilacion.js
   Requiere: global.js, estetica-data.js (window.TRATAMIENTOS_ESTETICA)
   Página combinada de depilación definitiva (pages/tratamiento-
   depilacion-definitiva.html): toggle de género + mapa corporal
   clickeable + buscador/filtro por zona, todo sincronizado entre sí.
   ============================================================ */
(function () {
  const grid = document.getElementById("depiGrid");
  if (!grid || !window.TRATAMIENTOS_ESTETICA) return;

  const data = window.TRATAMIENTOS_ESTETICA;

  /* Agrupa cada una de las 57 zonas puntuales en una de las 6 regiones
     del mapa corporal. Es una clasificación editorial (no viene de la
     data original), pensada para que el mapa tenga pocas zonas grandes
     en vez de 57 puntos clickeables. */
  const ZONA_POR_SLUG = {
    "depilacion-femenina-bozo": "cabeza",
    "depilacion-femenina-bozo-menton": "cabeza",
    "depilacion-femenina-cuello-anterior": "cabeza",
    "depilacion-femenina-cuello-completo": "cabeza",
    "depilacion-femenina-cuello-posterior": "cabeza",
    "depilacion-femenina-entrecejo": "cabeza",
    "depilacion-femenina-frente": "cabeza",
    "depilacion-femenina-medio-rostro": "cabeza",
    "depilacion-femenina-mejillas": "cabeza",
    "depilacion-femenina-menton-submenton": "cabeza",
    "depilacion-femenina-patillas": "cabeza",
    "depilacion-femenina-rostro-completo": "cabeza",
    "depilacion-femenina-abdomen": "pecho",
    "depilacion-femenina-linea-abdominal": "pecho",
    "depilacion-femenina-mamas-areolas": "pecho",
    "depilacion-femenina-pecho-completo": "pecho",
    "depilacion-femenina-antebrazos": "hombros-brazos",
    "depilacion-femenina-antebrazos-con-manos": "hombros-brazos",
    "depilacion-femenina-axilas": "hombros-brazos",
    "depilacion-femenina-brazos-completos": "hombros-brazos",
    "depilacion-femenina-hombros": "hombros-brazos",
    "depilacion-femenina-manos-completas": "hombros-brazos",
    "depilacion-femenina-cavado-completo-tira-de-cola": "cadera",
    "depilacion-femenina-cavado-completo-profundo-labios": "cadera",
    "depilacion-femenina-cavado-profundo": "cadera",
    "depilacion-femenina-espalda-baja": "cadera",
    "depilacion-femenina-espalda-completa": "cadera",
    "depilacion-femenina-gluteos": "cadera",
    "depilacion-femenina-tira-de-cola": "cadera",
    "depilacion-femenina-media-pierna-alta": "piernas",
    "depilacion-femenina-media-pierna-con-rodilla": "piernas",
    "depilacion-femenina-media-pierna-sin-rodilla": "piernas",
    "depilacion-femenina-piernas-completas": "piernas",
    "depilacion-femenina-pies-con-dedos": "pies",

    "depilacion-masculina-barba-completa": "cabeza",
    "depilacion-masculina-cuello": "cabeza",
    "depilacion-masculina-entrecejo": "cabeza",
    "depilacion-masculina-patillas": "cabeza",
    "depilacion-masculina-abdomen": "pecho",
    "depilacion-masculina-abdomen-tetillas": "pecho",
    "depilacion-masculina-pecho-torax": "pecho",
    "depilacion-masculina-pecho-abdomen": "pecho",
    "depilacion-masculina-antebrazos": "hombros-brazos",
    "depilacion-masculina-axilas": "hombros-brazos",
    "depilacion-masculina-brazos-completos": "hombros-brazos",
    "depilacion-masculina-espalda-alta": "hombros-brazos",
    "depilacion-masculina-hombros": "hombros-brazos",
    "depilacion-masculina-espalda-baja": "cadera",
    "depilacion-masculina-espalda-completa": "cadera",
    "depilacion-masculina-genitales": "cadera",
    "depilacion-masculina-genitales-tira-de-cola": "cadera",
    "depilacion-masculina-gluteos": "cadera",
    "depilacion-masculina-tira-de-cola": "cadera",
    "depilacion-masculina-media-pierna-con-rodilla": "piernas",
    "depilacion-masculina-media-pierna-sin-rodilla": "piernas",
    "depilacion-masculina-piernas-completas": "piernas",
    "depilacion-masculina-empeine-dedos": "pies",
  };

  const ZONA_TEXTO = {
    cabeza: "Cabeza", pecho: "Pecho", "hombros-brazos": "Hombros / Brazos",
    cadera: "Cadera", piernas: "Piernas", pies: "Pies"
  };

  const DIACRITICOS = new RegExp("[" + String.fromCharCode(0x300) + "-" + String.fromCharCode(0x36f) + "]", "g");
  const norm = s => (s || "").toString().toLowerCase().normalize("NFD").replace(DIACRITICOS, "");

  const switchEl = document.getElementById("depiSwitch");
  const generoBtns = document.querySelectorAll(".pd-depi-switch-opt");
  const siluetaZonas = document.querySelectorAll(".pd-depi-zona");
  const chips = document.querySelectorAll("#depiFiltrosZona .chip");
  const buscar = document.getElementById("depiBuscar");
  const clear = document.getElementById("depiClear");
  const titulo = document.getElementById("depiTitulo");
  const count = document.getElementById("depiCount");
  const verMasBtn = document.getElementById("depiVerMas");
  const tickerTrack = document.getElementById("depiTickerTrack");
  const WA_NUM = "5493515079519";

  let genero = "femenina", zona = "", q = "";

  function nombreZona(nombre) {
    const i = nombre.indexOf("— ");
    return i === -1 ? nombre : nombre.slice(i + 2);
  }

  /* Ticker debajo del hero: nombres de las cards de depilación del género
     elegido (no las 6 zonas del mapa corporal) — se reconstruye en cada
     cambio de género. Duplicado una vez para el loop infinito (ver
     ticker.css: translateX(-50%) sobre .ticker-track, que es width:max-content). */
  function renderTicker() {
    if (!tickerTrack) return;
    const categoria = `depilacion-${genero}`;
    const nombres = data.filter(t => t.categoria === categoria).map(t => nombreZona(t.nombre));
    const itemsHtml = nombres.map(n => `<span>${n}</span><span class="ticker-dot">✦</span>`).join("");
    tickerTrack.innerHTML = itemsHtml + itemsHtml;
    /* completa el loop si con estas 2 copias no alcanza a cubrir 2x el
       ancho visible (listas cortas como la masculina, o pantallas muy
       anchas) — ver js/ticker.js */
    if (window.reforzarTicker) window.reforzarTicker(tickerTrack);
  }

  function render() {
    const categoria = `depilacion-${genero}`;
    const res = data.filter(t => {
      if (t.categoria !== categoria) return false;
      if (zona && ZONA_POR_SLUG[t.slug] !== zona) return false;
      if (q && !norm(nombreZona(t.nombre)).includes(q)) return false;
      return true;
    });
    titulo.textContent = zona ? `Zona: ${ZONA_TEXTO[zona]}` : "Todas las zonas";
    count.textContent = `${res.length} zona${res.length === 1 ? "" : "s"}`;
    grid.innerHTML = res.map(t => {
      const nombreCorto = nombreZona(t.nombre);
      const waText = encodeURIComponent(`Hola, buen día. Quería consultar por depilación de ${nombreCorto.toLowerCase()}, ¿me darían información?`);
      return `
      <div class="prac-card">
        <span class="tag">${ZONA_TEXTO[ZONA_POR_SLUG[t.slug]] || ""}</span>
        <h3>${nombreCorto}</h3>
        <p class="pd-depi-card-desc">${t.descripcion}</p>
        <button class="pd-depi-card-toggle" type="button" style="display:none">Ver más</button>
        <a class="ver" href="https://wa.me/${WA_NUM}?text=${waText}" target="_blank" rel="noopener">Consultar por WhatsApp →</a>
      </div>`;
    }).join("");
    if (!res.length) grid.innerHTML = `<p style="color:var(--muted)">No encontramos zonas con esos criterios.</p>`;
    depiExpandido = false;
    depiVisibleMobile = MOBILE_PAGE;
    requestAnimationFrame(() => {
      detectarTruncado();
      medirVerMas();
    });
  }

  /* Descripción de cada card: hasta 4 líneas (ver max-height en
     tratamiento-depilacion.css) con un degradé al final si el texto no
     entra entero; el botón "Ver más"/"Ver menos" solo se muestra cuando
     realmente hay texto oculto (scrollHeight > clientHeight). Se mide acá
     — ANTES de que medirVerMas() esconda las cards que no entran en las 2
     filas — para que la medición no dé 0 en cards ocultas (display:none). */
  function detectarTruncado() {
    grid.querySelectorAll(".pd-depi-card-desc").forEach(p => {
      p.classList.remove("is-expanded");
      const toggle = p.nextElementSibling;
      const esToggle = toggle && toggle.classList.contains("pd-depi-card-toggle");
      const truncado = p.scrollHeight > p.clientHeight + 1;
      p.classList.toggle("is-truncado", truncado);
      if (esToggle) {
        toggle.style.display = truncado ? "" : "none";
        toggle.textContent = "Ver más";
      }
    });
  }
  /* Delegado en el grid (no por card): el catálogo se reconstruye entero
     en cada render(), así que atar un listener por card se perdería en
     cada filtro/búsqueda nuevos. */
  grid.addEventListener("click", e => {
    const toggle = e.target.closest(".pd-depi-card-toggle");
    if (!toggle) return;
    const desc = toggle.previousElementSibling;
    if (!desc) return;
    const expandido = desc.classList.toggle("is-expanded");
    toggle.textContent = expandido ? "Ver menos" : "Ver más";
  });

  const esMobile = () => window.matchMedia("(max-width:768px)").matches;

  /* Desktop/tablet: deja visibles solo las primeras 2 filas del catálogo
     (según cuántas cards entran realmente en el ancho de la columna, no
     una cantidad fija) con un botón "Ver más" para el resto — mismo
     criterio que limitarAUnaFila() de especialidad.js, pero con 2 filas
     en vez de 1. Mobile: arranca en modo swipe con TODAS las cards en una
     fila horizontal (ver .prac-grid.is-swipe en practicas.css); "Ver más"
     ahí cambia a la grilla normal en vez de sumar resultados. Se vuelve a
     medir en cada render() (la lista cambia con cada filtro/búsqueda), en
     cada resize (cruzar el breakpoint mobile, o cambiar la cantidad de
     columnas) y en window "load" (por si las fuentes web todavía no
     habían terminado de cargar en la primera medición). */
  const MOBILE_PAGE = 4;
  let depiExpandido = false;
  let depiVisibleMobile = MOBILE_PAGE;
  function medirVerMas() {
    if (!verMasBtn) return;
    const items = Array.from(grid.querySelectorAll(".prac-card"));
    const mobile = esMobile();
    grid.classList.toggle("is-swipe", mobile && !depiExpandido);
    if (mobile) {
      if (!depiExpandido) {
        items.forEach(el => { el.style.display = ""; });
        verMasBtn.style.display = items.length > 1 ? "inline-flex" : "none";
        verMasBtn.textContent = "Ver en cuadrícula";
        return;
      }
      /* en cuadrícula, de a MOBILE_PAGE (4) por tap; "Ver menos" solo
         cuando ya no queda nada más para mostrar */
      items.forEach((el, i) => { el.style.display = i < depiVisibleMobile ? "" : "none"; });
      const quedan = items.length - depiVisibleMobile;
      verMasBtn.style.display = "inline-flex";
      verMasBtn.textContent = quedan > 0 ? `Ver más (${quedan})` : "Ver menos";
      return;
    }
    if (items.length < 2) { verMasBtn.style.display = "none"; return; }
    items.forEach(el => { el.style.display = ""; });
    const tops = [...new Set(items.map(el => el.offsetTop))].sort((a, b) => a - b).slice(0, 2);
    const ocultos = items.filter(el => !tops.includes(el.offsetTop));
    if (!ocultos.length) { verMasBtn.style.display = "none"; return; }
    verMasBtn.style.display = "inline-flex";
    if (!depiExpandido) ocultos.forEach(el => el.style.display = "none");
    verMasBtn.textContent = depiExpandido ? "Ver menos" : `Ver más (${ocultos.length})`;
  }
  window.addEventListener("load", () => { detectarTruncado(); medirVerMas(); });
  if (verMasBtn) verMasBtn.addEventListener("click", () => {
    if (esMobile()) {
      if (!depiExpandido) {
        /* pasa de la fila swipe a la cuadrícula, arrancando en la
           primera página (4 cards) */
        depiExpandido = true;
        depiVisibleMobile = MOBILE_PAGE;
        medirVerMas();
        return;
      }
      const total = grid.querySelectorAll(".prac-card").length;
      if (depiVisibleMobile >= total) {
        /* ya no queda nada más para mostrar: vuelve a la fila swipe */
        depiExpandido = false;
        depiVisibleMobile = MOBILE_PAGE;
        medirVerMas();
        grid.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        depiVisibleMobile += MOBILE_PAGE;
        medirVerMas();
      }
      return;
    }
    depiExpandido = !depiExpandido;
    medirVerMas();
    if (!depiExpandido) grid.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  let depiResizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(depiResizeTimer);
    depiResizeTimer = setTimeout(() => { detectarTruncado(); medirVerMas(); }, 150);
  });

  const thumb = switchEl ? switchEl.querySelector(".pd-depi-switch-thumb") : null;
  /* Posiciona el relleno con el ancho/left real (en px) del botón activo,
     en vez de 50%/translateX(100%): evita que el redondeo de subpíxeles
     del navegador deje una línea blanca entre el relleno y el borde. */
  function positionThumb() {
    if (!thumb) return;
    const activo = switchEl.querySelector(".pd-depi-switch-opt.active");
    if (!activo) return;
    thumb.style.left = activo.offsetLeft + "px";
    thumb.style.width = activo.offsetWidth + "px";
  }

  generoBtns.forEach(btn => btn.addEventListener("click", () => {
    generoBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    genero = btn.dataset.genero;
    const esMasculina = genero === "masculina";
    if (switchEl) switchEl.classList.toggle("is-masculina", esMasculina);
    /* el celeste/azul marino reemplaza al rosa solo en esta página */
    document.body.classList.toggle("tema-masculino", esMasculina);
    positionThumb();
    renderTicker();
    render();
  }));

  window.addEventListener("resize", positionThumb);
  requestAnimationFrame(positionThumb);

  function setZona(val) {
    zona = (zona === val) ? "" : val;
    siluetaZonas.forEach(g => g.classList.toggle("is-active", g.dataset.zona === zona));
    chips.forEach(c => c.classList.toggle("active", c.dataset.zona === zona));
    render();
  }
  siluetaZonas.forEach(g => g.addEventListener("click", () => setZona(g.dataset.zona)));
  chips.forEach(c => c.addEventListener("click", () => { setZona(c.dataset.zona); if (filtroToggle) cerrarFiltros(); }));

  /* Botón "Filtros": los chips de zona viven colapsados detrás, igual
     que en especialidades/medicina estética (ver practicas.css). */
  const filtroToggle = document.getElementById("depiFiltroToggle");
  const depiFiltrosWrap = document.getElementById("depiFiltrosZonaWrap");
  function cerrarFiltros() {
    if (!filtroToggle || !depiFiltrosWrap) return;
    depiFiltrosWrap.classList.remove("open");
    filtroToggle.setAttribute("aria-expanded", "false");
  }
  if (filtroToggle && depiFiltrosWrap) {
    filtroToggle.addEventListener("click", () => {
      const open = depiFiltrosWrap.classList.toggle("open");
      filtroToggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", e => {
      if (depiFiltrosWrap.contains(e.target) || filtroToggle.contains(e.target)) return;
      cerrarFiltros();
    });
  }

  if (buscar) buscar.addEventListener("input", () => {
    q = norm(buscar.value);
    clear.classList.toggle("show", !!buscar.value);
    render();
  });
  if (clear) clear.addEventListener("click", () => { buscar.value = ""; q = ""; clear.classList.remove("show"); render(); });

  renderTicker();
  render();
})();
