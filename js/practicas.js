/* ============================================================
   CGAP · practicas.js
   Requiere: global.js, data.js (window.PRACTICAS)
   ============================================================ */
/* Rango Unicode de marcas diacríticas combinantes (0300-036f), construido
   con String.fromCharCode para evitar ambigüedades de escape en el archivo. */
const DIACRITICOS_PRAC = new RegExp("[" + String.fromCharCode(0x300) + "-" + String.fromCharCode(0x36f) + "]", "g");
const norm = s => (s || "").toString().toLowerCase().normalize("NFD").replace(DIACRITICOS_PRAC, "");

const pracGrid = document.getElementById("pracGrid");
if (pracGrid && window.PRACTICAS) {
  const data = window.PRACTICAS;
  const buscar = document.getElementById("pracBuscar");
  const clear = document.getElementById("pracClear");
  const count = document.getElementById("pracCount");
  const titulo = document.getElementById("pracTitulo");
  const chips = document.querySelectorAll("#pracFiltros .chip");
  const modal = document.getElementById("pracModal");
  const verMasBtn = document.getElementById("pracVerMas");
  const verMasCollapseBtn = document.getElementById("pracVerMasCollapse");
  const searchFilterBar = document.querySelector(".prac2-search-filter");
  const STICKY_TOP = 100; /* debe coincidir con el "top" sticky de .prac2-search-filter en practicas.css */
  /* ~2 filas, pero de cuántas columnas depende del ancho — tiene que
     coincidir con las columnas reales de .prac-grid en cada escalón de
     styles/responsive/practicas.css (6 en desktop grande, 5 entre
     1480-1900px, 4 entre 1181-1479px, 3 en notebooks chicas (≤1180),
     2 en mobile/tablets chicas). */
  function pageSize() {
    if (window.matchMedia("(max-width:768px)").matches) return 4;
    if (window.matchMedia("(max-width:1180px)").matches) return 6;
    if (window.matchMedia("(max-width:1479px)").matches) return 8;
    if (window.matchMedia("(max-width:1850px)").matches) return 10;
    return 12;
  }
  const esMobile = () => window.matchMedia("(max-width:768px)").matches;
  let fEsp = "", fTipo = "", q = "";
  let resActual = [], visibleCount = pageSize();
  /* en mobile el catálogo arranca como una fila swipeable (una sola
     "columna" que se recorre arrastrando el dedo, ver .prac-grid.is-swipe
     en practicas.css) en vez de la grilla envuelta habitual; "Ver más" ahí
     no agrega más resultados, cambia a la grilla normal (ver renderGrid) */
  let gridExpandido = false;

  const espTexto = {
    circuito: "Circuito Ginecológico", ginecologia: "Ginecología", obstetricia: "Obstetricia", ecografia: "Ecografía",
    laboratorio: "Laboratorio", endocrinologia: "Endocrinología", nutricion: "Nutrición",
    dermatologia: "Dermatología", cardiologia: "Cardiología", flebologia: "Flebología",
    "clinica-medica": "Clínica médica", oncologia: "Oncología"
  };
  const tipoTexto = { consulta: "Consulta", diagnostico: "Diagnóstico", procedimiento: "Procedimiento", control: "Control" };

  function render() {
    let res = data.filter(p => {
      const okEsp = !fEsp || p.especialidad === fEsp;
      const okTipo = !fTipo || p.tipo === fTipo;
      const okQ = !q
        || norm(p.nombre).includes(q)
        || norm(p.descripcion).includes(q)
        || norm(espTexto[p.especialidad] || p.especialidad).includes(q)
        || norm(tipoTexto[p.tipo] || p.tipo).includes(q);
      return okEsp && okTipo && okQ;
    });
    if (!fEsp && !fTipo && !q) {
      titulo.textContent = "Más buscadas";
      const dest = res.filter(p => p.masBuscada);
      if (dest.length) res = dest;
    } else {
      titulo.textContent = "Resultados";
    }
    count.textContent = `${res.length} práctica${res.length === 1 ? "" : "s"}`;
    resActual = res;
    visibleCount = pageSize();
    gridExpandido = false;
    renderGrid();
  }

  /* Desktop/tablet: muestra de a pageSize() resultados (~2 filas) con un
     botón "Ver más" para no tirar todo el catálogo de una vez. Mobile: por
     defecto arranca en modo swipe con TODOS los resultados en una fila
     horizontal (no hace falta paginar, el paciente los recorre arrastrando
     el dedo); "Ver más" ahí no suma resultados, cambia a la grilla normal
     envuelta en varias filas (gridExpandido). Se resetea en cada
     búsqueda/filtro nuevo desde render(). */
  function renderGrid() {
    const swipe = esMobile() && !gridExpandido;
    const mostrar = swipe ? resActual : resActual.slice(0, visibleCount);
    pracGrid.classList.toggle("is-swipe", swipe);
    /* Cada card es un <a> real a su página propia (practica-<slug>.html,
       indexable por buscadores); si hay JS, el click abre el modal en vez
       de navegar, para no perder la interacción rápida en el catálogo. */
    pracGrid.innerHTML = mostrar.map((p, i) => `
      <a class="prac-card reveal" href="${p.slug ? `practica-${p.slug}.html` : "#"}" data-i="${data.indexOf(p)}">
        <span class="tag">${espTexto[p.especialidad] || p.especialidad}</span>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <span class="ver">Ver detalle →</span>
      </a>`).join("");
    pracGrid.querySelectorAll(".prac-card").forEach(c => {
      requestAnimationFrame(() => c.classList.add("in"));
      c.addEventListener("click", e => {
        e.preventDefault();
        abrir(data[c.dataset.i]);
      });
    });
    if (!resActual.length) pracGrid.innerHTML = `<p style="color:var(--muted)">No encontramos prácticas con esos criterios.</p>`;

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

  const WA_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7s1.9 2.9 4.6 4c1.7.7 2.3.8 3.1.7.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z"/></svg>`;

  function abrir(p) {
    const waText = encodeURIComponent(`Hola, buen día. Quería solicitar un turno para ${p.nombre}, ¿me darían información?`);
    const waHref = `https://wa.me/5493515079642?text=${waText}`;
    const portalHref = "https://pacientes.cgap.com.ar/Login";
    const turnoWeb = p.turnoWeb === true;
    const disponibilidad = turnoWeb
      ? `<div class="modal-row"><b>Disponibilidad</b><span>Podés sacar el turno desde el <a href="${portalHref}" target="_blank" rel="noopener">portal web</a> o por <a href="${waHref}" target="_blank" rel="noopener">WhatsApp</a>.</span></div>`
      : "";
    modal.querySelector(".modal-card").innerHTML = `
      <button class="close" aria-label="Cerrar">×</button>
      <span class="tag">${espTexto[p.especialidad] || p.especialidad}</span>
      <h3>${p.nombre}</h3>
      <p class="desc">${p.descripcion}</p>
      <div class="modal-row"><b>Preparación</b><span>${p.preparacion || "—"}</span></div>
      <div class="modal-row"><b>Orden médica</b><span>${p.orden || "—"}</span></div>
      <div class="modal-row"><b>Duración</b><span>${p.duracion || "—"}</span></div>
      ${disponibilidad}
      <a class="btn${turnoWeb ? "" : " btn-whatsapp"}" target="_blank" rel="noopener" href="${turnoWeb ? portalHref : waHref}">${turnoWeb ? "Solicitar turno" : WA_ICON + "Gestionar turno"}</a>
      ${p.slug ? `<a class="modal-ficha-link" href="practica-${p.slug}.html">Ver ficha completa</a>` : ""}`;
    modal.classList.add("open");
    modal.querySelector(".close").onclick = () => modal.classList.remove("open");
  }
  modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("open"); });

  chips.forEach(ch => ch.addEventListener("click", () => {
    const grupo = ch.dataset.grupo, val = ch.dataset.filter;
    const active = ch.classList.contains("active");
    document.querySelectorAll(`#pracFiltros .chip[data-grupo="${grupo}"]`).forEach(c => c.classList.remove("active"));
    if (!active) { ch.classList.add("active"); if (grupo === "especialidad") fEsp = val; else fTipo = val; }
    else { if (grupo === "especialidad") fEsp = ""; else fTipo = ""; }
    render();
    if (filtroToggle) cerrarFiltros();
  }));

  /* Botón "Filtros" (solo visible <580px, ver practicas.css): en vez de
     la fila de chips siempre visible —que en celulares angostos se
     rompía en una lista larguísima—, en mobile queda oculta por
     default y este botón la despliega como panel, con las 2 listas
     (Especialidad/Tipo) ya agrupadas en el propio HTML. */
  const filtroToggle = document.getElementById("pracFiltroToggle");
  const pracFiltrosEl = document.getElementById("pracFiltros");
  function cerrarFiltros() {
    if (!filtroToggle || !pracFiltrosEl) return;
    pracFiltrosEl.classList.remove("open");
    filtroToggle.setAttribute("aria-expanded", "false");
  }
  if (filtroToggle && pracFiltrosEl) {
    filtroToggle.addEventListener("click", () => {
      const open = pracFiltrosEl.classList.toggle("open");
      filtroToggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", e => {
      if (pracFiltrosEl.contains(e.target) || filtroToggle.contains(e.target)) return;
      cerrarFiltros();
    });
  }

  /* Dentro del panel, "Especialidad" y "Tipo de estudio" son acordeones
     independientes: arrancan cerrados y el paciente los abre/cierra a
     mano, en vez de ver las 15 opciones juntas de entrada. */
  document.querySelectorAll(".prac2-filter-group-toggle").forEach(toggle => {
    const lista = toggle.nextElementSibling;
    if (!lista) return;
    toggle.addEventListener("click", () => {
      const open = !lista.classList.contains("open");
      lista.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
  });
  /* al escribir en el buscador, baja la pantalla hasta los resultados para
     que el paciente vea los estudios que va encontrando el filtro. El
     destino se calcula para que el título quede pegado justo debajo de la
     barra sticky de buscador+filtros (no debajo del navbar solo), midiendo
     la altura que la barra va a tener ya "pegada" (con los chips inactivos
     ocultos), que es la que tendrá en el momento del scroll. */
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
  buscar.addEventListener("input", () => {
    q = norm(buscar.value); clear.classList.toggle("show", !!buscar.value); render();
    clearTimeout(scrollBusquedaTimer);
    if (q) scrollBusquedaTimer = setTimeout(bajarAResultados, 400);
  });
  clear.addEventListener("click", () => { buscar.value = ""; q = ""; clear.classList.remove("show"); render(); });

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
  /* recalcula al cruzar el breakpoint mobile (rotar el dispositivo, o
     redimensionar la ventana) */
  let pracResizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(pracResizeTimer);
    pracResizeTimer = setTimeout(renderGrid, 150);
  });

  /* Barra sticky de buscador+filtros: al quedar pegada arriba, la clase
     is-stuck hace que la hoja de estilos colapse los chips inactivos (y
     todo el bloque de filtros si no hay ninguno activo), para que el
     buscador siempre esté visible sin que la barra ocupe demasiado alto.
     Umbrales separados para entrar/salir (histéresis), mismo criterio que
     el navbar compacto en global.js: con un solo umbral, el propio
     colapso de los chips cambia el alto de la barra, lo que puede mover
     su posición justo alrededor de ese umbral y generar un ciclo de
     "se pega → se despega → se pega" (se sentía como que la barra
     bajaba/subía de golpe al scrollear). */
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

  /* Activar filtro desde URL (?esp=circuito) */
  const espParam = new URLSearchParams(window.location.search).get("esp");
  if (espParam) {
    const chip = document.querySelector(`#pracFiltros .chip[data-grupo="especialidad"][data-filter="${espParam}"]`);
    if (chip) { chip.classList.add("active"); fEsp = espParam; }
  }
  render();
}

/* ---------- Hint tags: click → llenar buscador y scrollear al catálogo ---------- */
(function(){
  const pracBuscar = document.getElementById('pracBuscar');
  document.querySelectorAll('.prac2-search-hints span').forEach(hint => {
    hint.addEventListener('click', function() {
      if (pracBuscar) {
        pracBuscar.value = this.textContent;
        pracBuscar.dispatchEvent(new Event('input'));
        document.getElementById('catalogo')?.scrollIntoView({behavior:'smooth'});
      }
    });
  });
})();

/* ---------- "Nuestras especialidades": modal de elección ----------
   Cada card ya no linkea directo a la página de la especialidad — al
   tocarla abre un modal preguntando si el paciente quiere consultar
   turno por WhatsApp para esa especialidad, o ver el listado de
   médicos y prácticas (eso sí navega a especialidad-<slug>.html). */
(function () {
  const modal = document.getElementById("espChoiceModal");
  const card = modal ? modal.querySelector(".modal-card") : null;
  if (!modal || !card) return;
  const WA_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7s1.9 2.9 4.6 4c1.7.7 2.3.8 3.1.7.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z"/></svg>`;

  document.querySelectorAll(".prac2-esp-card").forEach(btn => {
    btn.addEventListener("click", () => {
      const nombre = btn.dataset.espNombre;
      const slug = btn.dataset.espSlug;
      const href = btn.dataset.espHref;
      const waText = encodeURIComponent(`Hola, buen día. Quería consultar un turno de ${nombre}, ¿me darían información?`);
      const waHref = `https://wa.me/5493515079642?text=${waText}`;
      card.innerHTML = `
        <button class="close" aria-label="Cerrar">×</button>
        <h3>${nombre}</h3>
        <p class="desc">¿Qué te gustaría hacer?</p>
        <a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${waHref}">${WA_ICON}Consultar turno por WhatsApp</a>
        <a class="btn-outline-plum" href="${href}" style="display:flex;justify-content:center;margin-top:.7rem">Ver médicos y prácticas</a>`;
      card.querySelector(".close").addEventListener("click", () => modal.classList.remove("open"));
      modal.classList.add("open");
    });
  });
  modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("open"); });
})();
