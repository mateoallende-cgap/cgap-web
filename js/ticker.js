/* ============================================================
   CGAP · ticker.js
   Refuerza el loop infinito de .ticker-track (ver ticker.css, usado en
   index.html, especialidades.html, medicina-estetica.html, circuito.html
   y tratamiento-depilacion-definitiva.html): la animación depende de que
   el contenido duplicado (translateX(-50%)) sea al menos tan ancho como
   la franja visible del .ticker-wrap; si la lista de items es corta o la
   pantalla es muy ancha, sobra un tramo sin texto (en blanco) al final
   de cada vuelta. Clona el contenido completo del track las veces que
   hagan falta (siempre duplicando el bloque entero, para no romper la
   simetría que necesita el -50%) hasta que haya ancho de sobra.
   Corre solo/automático al cargar la página, y queda expuesto como
   window.reforzarTicker(track) para páginas que arman su ticker con JS
   en runtime (ver renderTicker() en tratamiento-depilacion.js).
   ============================================================ */
(function () {
  function reforzarTicker(track) {
    if (!track) return;
    const wrap = track.closest(".ticker-wrap");
    if (!wrap || !track.children.length) return;
    let vueltas = 0;
    while (track.scrollWidth < wrap.clientWidth * 2 && vueltas < 6) {
      Array.from(track.children).forEach(el => track.appendChild(el.cloneNode(true)));
      vueltas++;
    }
  }
  window.reforzarTicker = reforzarTicker;

  function reforzarTodos() {
    document.querySelectorAll(".ticker-track").forEach(reforzarTicker);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", reforzarTodos);
  } else {
    reforzarTodos();
  }
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(reforzarTodos, 200);
  });
})();
