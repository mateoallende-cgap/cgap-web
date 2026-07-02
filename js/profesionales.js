/* ============================================================
   CGAP · profesionales.js
   Requiere: global.js, data.js (window.PROFESIONALES)
   ============================================================ */

const iniciales = n => n.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();

/* Rango Unicode de marcas diacríticas combinantes (0300-036f), construido
   con String.fromCharCode para evitar ambigüedades de escape en el archivo. */
const DIACRITICOS_PROF = new RegExp("[" + String.fromCharCode(0x300) + "-" + String.fromCharCode(0x36f) + "]", "g");
const norm = s => (s || "").toString().toLowerCase().normalize("NFD").replace(DIACRITICOS_PROF, "");

const profGrid = document.getElementById("profGrid");
if (profGrid && window.PROFESIONALES) {
  const data = window.PROFESIONALES;
  const buscar = document.getElementById("profBuscar");
  const clear = document.getElementById("profClear");
  const count = document.getElementById("profCount");
  const titulo = document.getElementById("profTitulo");
  const chips = document.querySelectorAll("#profFiltros .chip");
  let fEsp = "", q = "";

  function render() {
    let res = data.filter(p => {
      const okEsp = !fEsp || p.especialidad === fEsp;
      const okQ = !q || norm(p.nombre).includes(q) || norm(p.apellido).includes(q)
        || norm(p.especialidadTexto).includes(q) || norm(p.horario).includes(q);
      return okEsp && okQ;
    });
    if (!fEsp && !q) {
      titulo.textContent = "Profesionales destacados";
      const dest = res.filter(p => p.destacado);
      if (dest.length) res = dest;
    } else {
      titulo.textContent = "Resultados";
    }
    count.textContent = `${res.length} profesional${res.length === 1 ? "" : "es"}`;
    profGrid.innerHTML = res.map(p => `
      <article class="doc-card reveal">
        <div class="doc-photo"><span>${iniciales(p.nombre + " " + p.apellido)}</span></div>
        <h3>${p.nombre} ${p.apellido}</h3>
        <p class="esp">${p.especialidadTexto}</p>
        <span class="hor">Horario: ${p.horario}</span>
      </article>`).join("");
    profGrid.querySelectorAll(".doc-card").forEach(c => requestAnimationFrame(() => c.classList.add("in")));
    if (!res.length) profGrid.innerHTML = `<p style="color:var(--muted)">No encontramos profesionales con esos criterios.</p>`;
  }

  chips.forEach(ch => ch.addEventListener("click", () => {
    const val = ch.dataset.filter, active = ch.classList.contains("active");
    chips.forEach(c => c.classList.remove("active"));
    fEsp = active ? "" : (ch.classList.add("active"), val);
    render();
  }));
  buscar.addEventListener("input", () => {
    q = norm(buscar.value); clear.classList.toggle("show", !!buscar.value); render();
  });
  clear.addEventListener("click", () => { buscar.value = ""; q = ""; clear.classList.remove("show"); render(); });
  render();
}
