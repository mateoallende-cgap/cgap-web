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
  const searchFilterBar = document.querySelector(".prac2-search-filter");
  const STICKY_TOP = 100; /* debe coincidir con el "top" sticky de .prac2-search-filter en practicas.css */
  let fEsp = "", fTipo = "", q = "";

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
    pracGrid.innerHTML = res.map((p, i) => `
      <article class="prac-card reveal" data-i="${data.indexOf(p)}">
        <span class="tag">${espTexto[p.especialidad] || p.especialidad}</span>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <span class="ver">Ver detalle →</span>
      </article>`).join("");
    pracGrid.querySelectorAll(".prac-card").forEach(c => {
      requestAnimationFrame(() => c.classList.add("in"));
      c.addEventListener("click", () => abrir(data[c.dataset.i]));
    });
    if (!res.length) pracGrid.innerHTML = `<p style="color:var(--muted)">No encontramos prácticas con esos criterios.</p>`;
  }

  function abrir(p) {
    const waText = encodeURIComponent(`Hola, quisiera gestionar un turno para: ${p.nombre}.`);
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
      <a class="btn" target="_blank" rel="noopener" href="${turnoWeb ? portalHref : waHref}">${turnoWeb ? "Solicitar turno" : "Gestionar turno"}</a>`;
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
  }));
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

  /* Barra sticky de buscador+filtros: al quedar pegada arriba, la clase
     is-stuck hace que la hoja de estilos oculte los chips inactivos (y todo
     el bloque de filtros si no hay ninguno activo), para que el buscador
     siempre esté visible sin que la barra ocupe demasiado alto. */
  if (searchFilterBar) {
    const actualizarSticky = () => {
      const stuck = searchFilterBar.getBoundingClientRect().top <= STICKY_TOP + 1;
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
