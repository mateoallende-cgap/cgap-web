/* ============================================================
   CGAP · circuito.js
   Efecto de scroll en "¿Cómo funciona?": al llegar a la sección,
   la grilla 2x2 pasa a modo "paso grande" y cada .circ2-step se va
   mostrando uno por uno a medida que se scrollea; al llegar al
   final del recorrido se resuelve de nuevo en la grilla 2x2.
   Se desactiva con prefers-reduced-motion o en pantallas angostas,
   donde .circ2-scroll simplemente no recibe altura extra y la
   grilla 2x2 estática queda como única vista (no-op, sin JS no pasa
   nada raro). Solo pages/circuito.html.
   ============================================================ */
(function () {
  const scroll = document.getElementById("circScroll");
  const sticky = scroll ? scroll.querySelector(".circ2-scroll-sticky") : null;
  const stepsEl = document.getElementById("circSteps");
  const ctaBar = scroll ? scroll.querySelector(".circ2-scroll-cta") : null;
  const steps = scroll ? Array.from(scroll.querySelectorAll(".circ2-step")) : [];
  if (!scroll || !sticky || !stepsEl || !steps.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || window.innerWidth <= 1024) return;

  const dotsWrap = scroll.querySelector(".circ2-scroll-dots");
  const dots = steps.map((_, i) => {
    const d = document.createElement("span");
    d.textContent = (i + 1) + "°";
    dotsWrap.appendChild(d);
    return d;
  });
  const runner = document.createElement("span");
  runner.className = "circ2-scroll-dots-runner";
  dotsWrap.appendChild(runner);

  /* Desliza el runner sobre la línea, interpolando entre el centro del
     punto anterior y el siguiente según cuánto se avanzó dentro del
     tramo actual — así se mueve de forma continua en vez de saltar de
     punto en punto. unitProgressClamped va de 0 (primer paso) a
     steps.length-1 (último paso). */
  function positionRunner(unitProgressClamped) {
    const lo = Math.floor(unitProgressClamped);
    const hi = Math.min(lo + 1, steps.length - 1);
    const frac = unitProgressClamped - lo;
    const a = dots[lo];
    const b = dots[hi];
    const ax = a.offsetLeft + a.offsetWidth / 2;
    const bx = b.offsetLeft + b.offsetWidth / 2;
    runner.style.transform = `translateX(${ax + (bx - ax) * frac}px)`;
    if (steps.length > 1) {
      dotsWrap.style.setProperty("--dots-progress", unitProgressClamped / (steps.length - 1));
    }
  }

  const STEP_VH = 45; /* scroll (en vh) que le toca a cada paso — poco, para no exigir de más */
  const HOLD_VH = 20; /* colchón final (en vh) para que el 2x2 se sienta "asentado" antes de soltar el scroll */
  const NAV_OFFSET = 100; /* mismo valor que el "top" del sticky en circuito.css */

  /* Alto del bloque sticky = todo el espacio libre entre el navbar y la
     barra de WhatsApp (que es fixed, no ocupa lugar en el documento),
     para que el contenido quede centrado en la pantalla completa y no
     en una caja de tamaño arbitrario. Se calcula en JS (no en CSS) y se
     usa el mismo valor tanto para la altura real del bloque como para
     la cuenta de cuánto scroll hace falta — así nunca se desincronizan
     (ver nota vieja: medir con offsetHeight en cada modo por separado
     era lo que generaba espacio de sobra). */
  let stickyH = 460;

  function computeStickyH() {
    const ctaH = ctaBar ? ctaBar.offsetHeight : 0;
    const available = Math.max(360, window.innerHeight - NAV_OFFSET - ctaH);
    /* En pantallas bajas, tanto la grilla 2x2 resuelta como el modo
       "paso grande" pueden necesitar más alto del que hay disponible.
       Antes ese sobrante se desbordaba del bloque sticky y quedaba
       pisando el contenido de más abajo o la barra de WhatsApp fija
       (sin overflow:hidden a propósito, ver comentario más abajo sobre
       por qué no se corta el título). Se mide el alto real de las dos
       variantes (todos los .circ2-step conviven en la misma celda de
       grilla en modo "paso grande", así que el más alto de los 4 ya
       determina el alto de esa medición sin necesidad de marcar
       ninguno .is-active) y se usa el mayor de los tres valores. */
    sticky.style.height = "auto";
    const naturalResolved = sticky.scrollHeight;
    scroll.classList.add("is-stage");
    const naturalStage = sticky.scrollHeight;
    scroll.classList.remove("is-stage");
    stickyH = Math.max(available, naturalResolved, naturalStage);
    sticky.style.height = stickyH + "px";
  }

  function setHeight() {
    computeStickyH();
    const desiredScroll = window.innerHeight * (steps.length * STEP_VH + HOLD_VH) / 100;
    scroll.style.height = (stickyH + desiredScroll) + "px";
  }

  scroll.classList.add("is-active");
  setHeight();

  let activeIndex = -1;
  let wasStage = false;
  let switchTimer = null;
  let ticking = false;

  function update() {
    ticking = false;
    const rect = scroll.getBoundingClientRect();
    const total = scroll.offsetHeight - stickyH;
    if (total <= 0) return;
    /* Antes de que el bloque sticky llegue a "engancharse" en top:100px,
       rect.top todavía es positivo (la sección sigue más abajo en la
       página). Sin este chequeo, progress quedaba clampeado a 0 tanto
       antes de llegar como en el instante exacto de enganchar, y ambos
       casos activaban el paso 1 por error. */
    const hasEntered = rect.top <= NAV_OFFSET;
    const progress = hasEntered ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;

    const totalUnits = steps.length + HOLD_VH / STEP_VH;
    const unitProgress = progress * totalUnits;
    const rawIndex = Math.floor(unitProgress);
    const isStage = hasEntered && rawIndex < steps.length;

    /* Progreso dentro del paso actual (0 a 1), para la barra de progreso
       de la línea divisoria — mismo mecanismo que --nav-progress del
       navbar (scaleX vía custom property). */
    if (isStage) {
      const localProgress = Math.min(Math.max(unitProgress - rawIndex, 0), 1);
      stepsEl.style.setProperty("--step-progress", localProgress);
    }

    /* Cambiar entre la grilla 2x2 y el modo "paso grande" implica un
       salto de layout que no se puede animar (grid-template-columns no
       interpola). En vez de eso, se tapa el salto con una breve caída
       de opacidad justo en el instante del cambio de modo, y recién
       ahí se aplica la clase is-stage — así el salto ocurre "a oscuras". */
    if (isStage !== wasStage) {
      stepsEl.classList.add("is-switching");
      clearTimeout(switchTimer);
      switchTimer = setTimeout(() => stepsEl.classList.remove("is-switching"), 260);
      wasStage = isStage;
    }

    scroll.classList.toggle("is-stage", isStage);

    const index = Math.min(rawIndex, steps.length - 1);
    if (isStage) {
      if (index !== activeIndex) {
        steps.forEach((s, i) => s.classList.toggle("is-active", i === index));
        dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
        activeIndex = index;
      }
      positionRunner(Math.min(unitProgress, steps.length - 1));
    } else if (activeIndex !== -1) {
      steps.forEach(s => s.classList.remove("is-active"));
      dots.forEach(d => d.classList.remove("is-active"));
      activeIndex = -1;
    }
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => { setHeight(); update(); });
  update();
})();
