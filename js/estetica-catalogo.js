/* ============================================================
   CGAP · estetica-catalogo.js
   Requiere: global.js, estetica-data.js (window.TRATAMIENTOS_ESTETICA)
   Buscador + filtro por categoría + catálogo dinámico + modal de detalle,
   para la sección "Tratamientos estéticos" de pages/medicina-estetica.html.
   Mismo patrón que js/practicas.js (buscador+filtros sticky, paginación de
   a ~2 filas con "Ver más"), adaptado a window.TRATAMIENTOS_ESTETICA — acá
   no hay ficha propia por tratamiento, así que la card abre un modal en vez
   de linkear a una página.
   ============================================================ */
(function () {
  const DIACRITICOS = new RegExp("[" + String.fromCharCode(0x300) + "-" + String.fromCharCode(0x36f) + "]", "g");
  const norm = s => (s || "").toString().toLowerCase().normalize("NFD").replace(DIACRITICOS, "");

  const grid = document.getElementById("estGrid");
  if (!grid || !window.TRATAMIENTOS_ESTETICA) return;

  const data = window.TRATAMIENTOS_ESTETICA;
  const buscar = document.getElementById("estBuscar");
  const clear = document.getElementById("estClear");
  const count = document.getElementById("estCount");
  const titulo = document.getElementById("estTitulo");
  const chips = document.querySelectorAll("#estFiltros .chip");
  const modal = document.getElementById("estModal");
  const verMasBtn = document.getElementById("estVerMas");
  const verMasCollapseBtn = document.getElementById("estVerMasCollapse");
  const searchFilterBar = document.querySelector(".prac2-search-filter");
  const STICKY_TOP = 100; /* debe coincidir con el "top" sticky de .prac2-search-filter en practicas.css */

  const categoriaTexto = {
    corporal: "Corporal",
    "depilacion-femenina": "Depilación femenina",
    "depilacion-masculina": "Depilación masculina",
    medico: "Tratamiento médico",
    cosmetologico: "Cosmetología"
  };

  /* mismos escalones que .prac-grid en styles/responsive/practicas.css */
  function pageSize() {
    if (window.matchMedia("(max-width:768px)").matches) return 4;
    if (window.matchMedia("(max-width:1180px)").matches) return 6;
    if (window.matchMedia("(max-width:1479px)").matches) return 8;
    if (window.matchMedia("(max-width:1850px)").matches) return 10;
    return 12;
  }
  const esMobile = () => window.matchMedia("(max-width:768px)").matches;

  let fCategoria = "", q = "";
  let resActual = [], visibleCount = pageSize();
  /* en mobile el catálogo arranca como una fila swipeable (ver
     .prac-grid.is-swipe en practicas.css) con todos los resultados, en vez
     de la grilla envuelta; "Ver más" ahí cambia a la grilla normal en vez
     de sumar resultados (ver renderGrid) */
  let gridExpandido = false;

  function render() {
    const res = data.filter(t => {
      const okCategoria = !fCategoria || t.categoria === fCategoria;
      const okQ = !q
        || norm(t.nombre).includes(q)
        || norm(t.descripcion).includes(q)
        || norm(categoriaTexto[t.categoria] || t.categoria).includes(q);
      return okCategoria && okQ;
    });
    titulo.textContent = (fCategoria || q) ? "Resultados" : "Todos los tratamientos";
    count.textContent = `${res.length} tratamiento${res.length === 1 ? "" : "s"}`;
    resActual = res;
    visibleCount = pageSize();
    gridExpandido = false;
    renderGrid();
  }

  /* Las 57 zonas de depilación (femenina + masculina) no tienen ficha
     propia: comparten una única página combinada. El resto de tratamientos
     sí tiene su ficha individual (tratamiento-<slug>.html). */
  function fichaSlug(t) {
    return (t.categoria === "depilacion-femenina" || t.categoria === "depilacion-masculina")
      ? "depilacion-definitiva"
      : t.slug;
  }

  function renderGrid() {
    const swipe = esMobile() && !gridExpandido;
    const mostrar = swipe ? resActual : resActual.slice(0, visibleCount);
    grid.classList.toggle("is-swipe", swipe);
    /* <a> real a la ficha (indexable); con JS el click abre el modal en vez
       de navegar. */
    grid.innerHTML = mostrar.map(t => `
      <a class="prac-card reveal" href="tratamiento-${fichaSlug(t)}.html" data-slug="${t.slug}">
        <span class="tag">${categoriaTexto[t.categoria] || t.categoria}</span>
        <h3>${t.nombre}</h3>
        <p>${t.descripcion}</p>
        <span class="ver">Ver detalle →</span>
      </a>`).join("");
    grid.querySelectorAll(".prac-card").forEach(c => {
      requestAnimationFrame(() => c.classList.add("in"));
      c.addEventListener("click", e => {
        e.preventDefault();
        const t = data.find(x => x.slug === c.dataset.slug);
        if (t) abrir(t);
      });
    });
    if (!resActual.length) grid.innerHTML = `<p style="color:var(--muted)">No encontramos tratamientos con esos criterios.</p>`;
    requestAnimationFrame(marcarTruncadas);

    if (verMasBtn) {
      if (esMobile()) {
        if (!gridExpandido) {
          verMasBtn.style.display = resActual.length > 1 ? "inline-flex" : "none";
          /* <580px: 2 columnas ya no entran (rompían el ancho de la
             página), así que ahí se expande en una sola columna — "fila"
             en vez de "cuadrícula" para que el texto sea preciso. */
          verMasBtn.textContent = window.matchMedia("(max-width:580px)").matches ? "Ver en fila" : "Ver en cuadrícula";
          if (verMasCollapseBtn) verMasCollapseBtn.style.display = "none";
        } else {
          /* en cuadrícula/fila, de a pageSize() (4 en mobile) por tap;
             "Ver menos" solo cuando ya no queda nada más para mostrar */
          const quedan = resActual.length - visibleCount;
          verMasBtn.style.display = "inline-flex";
          verMasBtn.textContent = quedan > 0 ? `Ver más (${quedan})` : "Ver menos";
          /* flecha para volver un paso (a la fila swipe) sin tener que
             seguir tocando "Ver más" hasta llegar a "Ver menos" */
          if (verMasCollapseBtn) verMasCollapseBtn.style.display = "grid";
        }
      } else {
        if (verMasCollapseBtn) verMasCollapseBtn.style.display = "none";
        const quedan = resActual.length - visibleCount;
        if (quedan > 0) {
          verMasBtn.style.display = "inline-flex";
          verMasBtn.textContent = `Ver más (${quedan})`;
        } else if (resActual.length > pageSize()) {
          verMasBtn.style.display = "inline-flex";
          verMasBtn.textContent = "Ver menos";
        } else {
          verMasBtn.style.display = "none";
        }
      }
    }
  }

  /* Degradé de texto (ver medicina-estetica.css): solo si la descripción
     realmente no entra en las 4 líneas del clamp — la card entera ya abre
     el modal con el texto completo, así que alcanza con el aviso visual,
     sin un botón "Ver más" propio de la card. Se vuelve a marcar en cada
     render, en window "load" (por si las fuentes web todavía no habían
     terminado de cargar en la primera medición) y en resize (el ancho de
     la card cambia la cantidad de líneas que entran). */
  function marcarTruncadas() {
    grid.querySelectorAll(".prac-card p").forEach(p => {
      p.classList.toggle("is-truncado", p.scrollHeight > p.clientHeight + 1);
    });
  }
  window.addEventListener("load", marcarTruncadas);
  /* recalcula en cada resize: marcarTruncadas (el ancho de la card cambia
     cuántas líneas entran) y renderGrid (cruzar el breakpoint mobile
     cambia entre modo swipe y grilla) */
  let estResizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(estResizeTimer);
    estResizeTimer = setTimeout(renderGrid, 150);
  });

  const WA_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7s1.9 2.9 4.6 4c1.7.7 2.3.8 3.1.7.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z"/></svg>`;

  function abrir(t) {
    if (!modal) return;
    const waText = encodeURIComponent(`Hola, quería consultar por ${t.nombre}.`);
    const waHref = `https://wa.me/5493515079519?text=${waText}`;
    const beneficios = Array.isArray(t.beneficios) && t.beneficios.length
      ? `<ul class="est-list">${t.beneficios.map(b => `<li>${b}</li>`).join("")}</ul>`
      : "";
    modal.querySelector(".modal-card").innerHTML = `
      <button class="close" aria-label="Cerrar">×</button>
      <span class="tag">${categoriaTexto[t.categoria] || t.categoria}</span>
      <h3>${t.nombre}</h3>
      <p class="desc">${t.descripcion}</p>
      ${beneficios}
      <a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${waHref}">${WA_ICON} Consultar por WhatsApp</a>
      <a class="modal-ficha-link" href="tratamiento-${fichaSlug(t)}.html">Ver ficha completa</a>`;
    modal.classList.add("open");
    modal.querySelector(".close").onclick = () => modal.classList.remove("open");
  }
  if (modal) modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("open"); });

  chips.forEach(ch => ch.addEventListener("click", () => {
    const active = ch.classList.contains("active");
    chips.forEach(c => c.classList.remove("active"));
    fCategoria = active ? "" : ch.dataset.filter;
    if (!active) ch.classList.add("active");
    render();
    if (filtroToggle) cerrarFiltros();
  }));

  /* Botón "Filtros" (solo visible <580px, ver practicas.css): sin esto,
     el panel de chips queda oculto por CSS a ese ancho (pensado para
     desplegarse con este botón) y no había forma de volver a mostrarlo
     en esta página. */
  const filtroToggle = document.getElementById("estFiltroToggle");
  const estFiltrosEl = document.getElementById("estFiltros");
  function cerrarFiltros() {
    if (!filtroToggle || !estFiltrosEl) return;
    estFiltrosEl.classList.remove("open");
    filtroToggle.setAttribute("aria-expanded", "false");
  }
  if (filtroToggle && estFiltrosEl) {
    filtroToggle.addEventListener("click", () => {
      const open = estFiltrosEl.classList.toggle("open");
      filtroToggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", e => {
      if (estFiltrosEl.contains(e.target) || filtroToggle.contains(e.target)) return;
      cerrarFiltros();
    });
  }

  let scrollBusquedaTimer;
  function bajarAResultados() {
    if (!titulo) return;
    let barH = 0;
    if (searchFilterBar) {
      const wasStuck = searchFilterBar.classList.contains("is-stuck");
      searchFilterBar.classList.add("is-stuck");
      barH = searchFilterBar.offsetHeight;
      if (!wasStuck) searchFilterBar.classList.remove("is-stuck");
    }
    const destino = titulo.getBoundingClientRect().top + window.scrollY - STICKY_TOP - barH - 16;
    if (Math.abs(window.scrollY - destino) < 40) return;
    window.scrollTo({ top: destino, behavior: "smooth" });
  }
  if (buscar) buscar.addEventListener("input", () => {
    q = norm(buscar.value); clear.classList.toggle("show", !!buscar.value); render();
    clearTimeout(scrollBusquedaTimer);
    if (q) scrollBusquedaTimer = setTimeout(bajarAResultados, 400);
  });
  if (clear) clear.addEventListener("click", () => { buscar.value = ""; q = ""; clear.classList.remove("show"); render(); });

  if (verMasBtn) verMasBtn.addEventListener("click", () => {
    if (esMobile()) {
      if (!gridExpandido) {
        /* pasa de la fila swipe a la cuadrícula, arrancando en la
           primera página (4 cards) */
        gridExpandido = true;
        visibleCount = pageSize();
        renderGrid();
        return;
      }
      if (visibleCount >= resActual.length) {
        /* ya no queda nada más para mostrar: vuelve a la fila swipe */
        gridExpandido = false;
        visibleCount = pageSize();
        renderGrid();
        document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        visibleCount += pageSize();
        renderGrid();
      }
      return;
    }
    if (visibleCount >= resActual.length) {
      visibleCount = pageSize();
      renderGrid();
      document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      visibleCount += pageSize();
      renderGrid();
    }
  });
  /* flecha junto a "Ver más": vuelve directo a la fila swipe sin tener
     que seguir tocando "Ver más" hasta que no quede nada más. */
  if (verMasCollapseBtn) verMasCollapseBtn.addEventListener("click", () => {
    gridExpandido = false;
    visibleCount = pageSize();
    renderGrid();
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* Umbrales separados para entrar/salir (histéresis): con uno solo, el
     propio colapso de los chips al pegarse cambia el alto de la barra,
     lo que puede mover su posición justo alrededor del umbral y generar
     un ciclo de "se pega → se despega → se pega" (se sentía como que la
     barra bajaba/subía de golpe al scrollear). Mismo criterio que
     practicas.js y que el navbar compacto en global.js. */
  if (searchFilterBar) {
    const STICKY_ENTER = STICKY_TOP + 1, STICKY_EXIT = STICKY_TOP + 24;
    let stuck = false;
    const actualizarSticky = () => {
      const top = searchFilterBar.getBoundingClientRect().top;
      if (!stuck && top <= STICKY_ENTER) stuck = true;
      else if (stuck && top > STICKY_EXIT) stuck = false;
      searchFilterBar.classList.toggle("is-stuck", stuck);
    };
    window.addEventListener("scroll", actualizarSticky, { passive: true });
    actualizarSticky();
  }

  render();
})();
