/* ============================================================
   CGAP · carousel.js
   Botones ‹ › genéricos para cualquier .carousel > .car-track.
   (mismo comportamiento que el carrusel de index.js, copiado para
   no depender de ese script en páginas que no cargan el resto de index.js)
   ============================================================ */
document.querySelectorAll(".car-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const t = document.getElementById(btn.dataset.target);
    if (!t) return;
    const card = t.querySelector(".prac-card,article,.doc-card,.nov-card");
    const step = card ? card.offsetWidth + 20 : 260;
    t.scrollBy({ left: btn.classList.contains("next") ? step : -step, behavior: "smooth" });
  });
});
