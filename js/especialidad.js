/* ============================================================
   CGAP · especialidad.js
   Requiere: data.js. Cada página de especialidad define, en un
   <script> inline antes de este archivo:
     window.ESPECIALIDAD = { prof: "<slug en PROFESIONALES>", prac: "<slug en PRACTICAS>" };
   (los slugs no siempre coinciden entre ambos datasets, por eso van separados)
   ============================================================ */
(function () {
  const cfg = window.ESPECIALIDAD;
  if (!cfg) return;

  const iniciales = n => n.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();

  const espTexto = {
    circuito: "Circuito Ginecológico", ginecologia: "Ginecología", obstetricia: "Obstetricia", ecografia: "Ecografía",
    laboratorio: "Laboratorio", endocrinologia: "Endocrinología", nutricion: "Nutrición",
    dermatologia: "Dermatología", cardiologia: "Cardiología", flebologia: "Flebología",
    "clinica-medica": "Clínica médica", oncologia: "Oncología"
  };

  /* Modal compartido: práctica y profesional usan el mismo #pracModal
     (nunca hay dos abiertos a la vez), cada uno con su propio render. */
  const modal = document.getElementById("pracModal");
  const WA_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7s1.9 2.9 4.6 4c1.7.7 2.3.8 3.1.7.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1z"/></svg>`;
  if (modal) modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("open"); });

  function abrirDoc(p) {
    if (!modal) return;
    const nombreCompleto = `${p.nombre} ${p.apellido}`;
    const waText = encodeURIComponent(`Hola, me gustaría sacar turno con el médico ${nombreCompleto}.`);
    const waHref = `https://wa.me/5493515079642?text=${waText}`;
    modal.querySelector(".modal-card").innerHTML = `
      <button class="close" aria-label="Cerrar">×</button>
      <div class="modal-doc-head">
        <div class="modal-doc-photo"><span>${iniciales(nombreCompleto)}</span></div>
        <div class="modal-doc-info">
          <h3>${nombreCompleto}</h3>
          <span class="tag">${p.especialidadTexto}</span>
          <div class="modal-row"><b>Horario</b><span>${p.horario}</span></div>
          ${p.matricula ? `<div class="modal-row"><b>Matrícula</b><span>${p.matricula}</span></div>` : ""}
        </div>
      </div>
      <a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${waHref}">${WA_ICON} Turno por WhatsApp</a>
      ${p.slug ? `<a class="modal-ficha-link" href="profesional-${p.slug}.html">Ver ficha completa</a>` : ""}`;
    modal.classList.add("open");
    modal.querySelector(".close").onclick = () => modal.classList.remove("open");
  }

  /* Deja visible solo la primera fila de un grid (según su layout real, no
     una cantidad fija de items) y agrega un botón "Ver más" para el resto,
     que al abrirlo pasa a "Ver menos" para volver a colapsar. */
  function limitarAUnaFila(grid, btn) {
    if (!btn) return;
    const items = Array.from(grid.children);
    if (items.length < 2) { btn.style.display = "none"; return; }
    requestAnimationFrame(() => {
      const primerTop = items[0].offsetTop;
      const enPrimeraFila = items.filter(el => el.offsetTop === primerTop).length;
      const ocultos = items.slice(enPrimeraFila);
      if (!ocultos.length) { btn.style.display = "none"; return; }
      let expandido = false;
      ocultos.forEach(el => el.style.display = "none");
      btn.style.display = "inline-flex";
      btn.textContent = `Ver más (${ocultos.length})`;
      btn.onclick = () => {
        expandido = !expandido;
        ocultos.forEach(el => el.style.display = expandido ? "" : "none");
        btn.textContent = expandido ? "Ver menos" : `Ver más (${ocultos.length})`;
        if (!expandido) grid.scrollIntoView({ behavior: "smooth", block: "nearest" });
      };
    });
  }

  /* ---------- Profesionales de la especialidad ---------- */
  const profGrid = document.getElementById("espProfGrid");
  const profVerMasBtn = document.getElementById("espProfVerMas");
  if (profGrid && window.PROFESIONALES) {
    const profs = cfg.prof ? window.PROFESIONALES.filter(p => p.especialidad === cfg.prof) : [];
    const seccion = profGrid.closest("section");
    if (!profs.length) {
      if (seccion) seccion.style.display = "none";
    } else {
      /* orden alfabético por apellido; el Dr. Allende Pinto siempre primero
         dentro de Ginecología */
      profs.sort((a, b) => {
        const aPin = cfg.prof === "ginecologia" && a.apellido === "Allende Pinto";
        const bPin = cfg.prof === "ginecologia" && b.apellido === "Allende Pinto";
        if (aPin !== bPin) return aPin ? -1 : 1;
        return a.apellido.localeCompare(b.apellido, "es");
      });
      profGrid.innerHTML = profs.map((p, i) => `
        <a class="doc-card reveal in" href="${p.slug ? `profesional-${p.slug}.html` : "#"}" data-i="${i}">
          <div class="doc-photo"><span>${iniciales(p.nombre + " " + p.apellido)}</span></div>
          <h3>${p.nombre} ${p.apellido}</h3>
          <p class="esp">${p.especialidadTexto}</p>
          <span class="hor">Horario: ${p.horario}</span>
          ${p.matricula ? `<span class="mat">Matrícula: ${p.matricula}</span>` : ""}
        </a>`).join("");
      profGrid.querySelectorAll(".doc-card").forEach(c => {
        c.addEventListener("click", e => {
          e.preventDefault();
          abrirDoc(profs[c.dataset.i]);
        });
      });
      limitarAUnaFila(profGrid, profVerMasBtn);
    }
  }

  /* ---------- Prácticas de la especialidad (con modal de detalle) ---------- */
  const pracGrid = document.getElementById("espPracGrid");
  const pracVerMasBtn = document.getElementById("espPracVerMas");

  function abrir(p) {
    if (!modal) return;
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

  if (pracGrid && window.PRACTICAS) {
    const pracs = cfg.prac ? window.PRACTICAS.filter(p => p.especialidad === cfg.prac) : [];
    const seccion = pracGrid.closest("section");
    if (!pracs.length) {
      if (seccion) seccion.style.display = "none";
    } else {
      pracs.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
      /* <a> real a la página propia de la práctica (indexable); el click
         abre el modal en vez de navegar cuando hay JS disponible. */
      pracGrid.innerHTML = pracs.map((p, i) => `
        <a class="prac-card reveal in" href="${p.slug ? `practica-${p.slug}.html` : "#"}" data-i="${i}">
          <span class="tag">${espTexto[p.especialidad] || p.especialidad}</span>
          <h3>${p.nombre}</h3>
          <p>${p.descripcion}</p>
          <span class="ver">Ver detalle →</span>
        </a>`).join("");
      pracGrid.querySelectorAll(".prac-card").forEach(c => {
        c.addEventListener("click", e => {
          e.preventDefault();
          abrir(pracs[c.dataset.i]);
        });
      });
      limitarAUnaFila(pracGrid, pracVerMasBtn);
    }
  }
})();
