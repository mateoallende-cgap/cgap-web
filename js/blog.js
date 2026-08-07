/* ============================================================
   CGAP · blog.js
   Requiere: global.js, blog-data.js (window.BLOG_TIPS)
   Sección "Blog & tips" de pages/nosotros.html: los chips de categoría
   arman una única fila de cards (.car-track, scrollea con los botones
   ‹› de carousel.js) — "Todos" muestra los tips más consultados
   (featured:true en blog-data.js), cada categoría muestra sus propios
   tips. Cada card linkea (por el título) a su ficha propia
   pages/blog-<slug>.html.
   ============================================================ */
(function () {
  const track = document.getElementById("blogCarTrack");
  if (!track || !window.BLOG_TIPS) return;

  const tips = window.BLOG_TIPS;
  const chips = document.querySelectorAll(".nos2-blog .blog2-chip");

  const CATEGORIA_TEXTO = {
    ginecologia: "Ginecología", dermatologia: "Dermatología", estetica: "Estética",
    nutricion: "Nutrición", endocrinologia: "Endocrinología"
  };
  const CATEGORIA_COLOR = {
    ginecologia: "var(--magenta)", dermatologia: "#2e86ab", estetica: "#8a1560",
    nutricion: "#4a8c3f", endocrinologia: "#e07b39"
  };

  function render(cat) {
    const lista = cat === "all" ? tips.filter(t => t.featured) : tips.filter(t => t.categoria === cat);
    track.innerHTML = lista.map(t => `
      <article class="blog2-card" data-cat="${t.categoria}">
        <div class="blog2-card-tag" style="--tag-color:${CATEGORIA_COLOR[t.categoria]}">${CATEGORIA_TEXTO[t.categoria]}</div>
        <h3 class="blog2-card-title"><a href="blog-${t.slug}.html">${t.titulo}</a></h3>
        <p class="blog2-card-what">${t.what}</p>
        <p class="blog2-card-quick">${t.quick}</p>
        <a class="blog2-card-btn" href="${t.ctaHref}"${t.ctaWa ? ' target="_blank" rel="noopener"' : ""}>${t.ctaLabel}</a>
      </article>`).join("");
    track.scrollTo({ left: 0 });
  }

  chips.forEach(chip => chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    render(chip.dataset.cat);
  }));

  render("all");
})();
