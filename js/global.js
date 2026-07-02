/* ============================================================
   CGAP · global.js (compartido por las 7 páginas)
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
