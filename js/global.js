/* ============================================================
   CGAP · global.js (se carga en las 143 páginas del sitio)
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

/* ---------- Navbar: compacta al scrollear + línea de progreso de scroll ---------- */
const navbar = document.querySelector(".navbar");
if (navbar) {
  /* Umbrales separados (histéresis) para entrar/salir del estado compacto:
     con un solo valor, el propio cambio de alto del navbar puede mover el
     scroll justo alrededor del umbral y generar un parpadeo en bucle. */
  const NAV_SCROLL_ENTER = 50, NAV_SCROLL_EXIT = 20;
  let navScrolled = false;

  const onNavScroll = () => {
    const y = window.scrollY;

    if (!navScrolled && y > NAV_SCROLL_ENTER) {
      navScrolled = true;
      navbar.classList.add("scrolled");
    } else if (navScrolled && y < NAV_SCROLL_EXIT) {
      navScrolled = false;
      navbar.classList.remove("scrolled");
    }

    /* línea debajo del navbar: su ancho refleja cuánto se scrolleó la página */
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? Math.min(y / scrollable, 1) : 0;
    navbar.style.setProperty("--nav-progress", pct);
  };
  onNavScroll();
  window.addEventListener("scroll", onNavScroll, { passive: true });
  window.addEventListener("resize", onNavScroll);
}

/* ---------- Modal "Turnos": elegir WhatsApp (ginecología o estética) ----------
   El botón conserva su href directo a WhatsApp de ginecología como
   fallback (si este script no corre, sigue funcionando); acá se
   intercepta el click para abrir el modal en su lugar. */
const turnosBtn = document.querySelector(".nav-cta-wa");
const turnosModal = document.getElementById("turnosModal");
if (turnosBtn && turnosModal) {
  const closeTurnosModal = () => turnosModal.classList.remove("open");
  turnosBtn.addEventListener("click", e => {
    e.preventDefault();
    turnosModal.classList.add("open");
  });
  turnosModal.querySelector(".close")?.addEventListener("click", closeTurnosModal);
  turnosModal.addEventListener("click", e => { if (e.target === turnosModal) closeTurnosModal(); });
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
