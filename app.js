/* ============================================================
   CGAP · app.js  (lógica compartida de todo el sitio)
   ============================================================ */

/* ---------- Menú mobile ---------- */
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
if (burger && navLinks) {
  burger.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => navLinks.classList.remove("open"))
  );
}

/* ---------- Animación al hacer scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add("in"), i * 50);
      io.unobserve(e.target);
    }
  });
}, { threshold: .1, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

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
const norm = s => (s || "").toString().toLowerCase()
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

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
   PÁGINA PRÁCTICAS · buscador + filtros + modal
   ============================================================ */
const pracGrid = document.getElementById("pracGrid");
if (pracGrid && window.PRACTICAS) {
  const data = window.PRACTICAS;
  const buscar = document.getElementById("pracBuscar");
  const clear = document.getElementById("pracClear");
  const count = document.getElementById("pracCount");
  const titulo = document.getElementById("pracTitulo");
  const chips = document.querySelectorAll("#pracFiltros .chip");
  const modal = document.getElementById("pracModal");
  let fEsp = "", fTipo = "", q = "";

  const espTexto = {
    ginecologia: "Ginecología", obstetricia: "Obstetricia", ecografia: "Ecografía",
    laboratorio: "Laboratorio", endocrinologia: "Endocrinología", nutricion: "Nutrición",
    dermatologia: "Dermatología", cardiologia: "Cardiología"
  };

  function render() {
    let res = data.filter(p => {
      const okEsp = !fEsp || p.especialidad === fEsp;
      const okTipo = !fTipo || p.tipo === fTipo;
      const okQ = !q || norm(p.nombre).includes(q) || norm(p.descripcion).includes(q);
      return okEsp && okTipo && okQ;
    });
    if (!fEsp && !fTipo && !q) {
      titulo.textContent = "Prácticas más buscadas";
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
    modal.querySelector(".modal-card").innerHTML = `
      <button class="close" aria-label="Cerrar">×</button>
      <span class="tag">${espTexto[p.especialidad] || p.especialidad}</span>
      <h3>${p.nombre}</h3>
      <p class="desc">${p.descripcion}</p>
      <div class="modal-row"><b>Preparación</b><span>${p.preparacion || "—"}</span></div>
      <div class="modal-row"><b>Orden médica</b><span>${p.orden || "—"}</span></div>
      <div class="modal-row"><b>Duración</b><span>${p.duracion || "—"}</span></div>
      <a class="btn" target="_blank" rel="noopener" href="https://wa.me/5493515079642?text=${waText}">Gestionar turno</a>`;
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
  buscar.addEventListener("input", () => {
    q = norm(buscar.value); clear.classList.toggle("show", !!buscar.value); render();
  });
  clear.addEventListener("click", () => { buscar.value = ""; q = ""; clear.classList.remove("show"); render(); });
  render();
}

/* ============================================================
   PÁGINA PROFESIONALES · buscador + filtros
   ============================================================ */
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
