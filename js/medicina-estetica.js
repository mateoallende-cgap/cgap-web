/* ============================================================
   CGAP · medicina-estetica.js
   Requiere: global.js
   ============================================================ */
(function(){
  const phrases = [
    "Estética avanzada para acompañar tu bienestar, con aparatología de última tecnología y seguimiento profesional.",
    "No se trata de cambiar quién sos, sino de potenciar cómo querés sentirte.",
    "Tecnología, bienestar y cuidado profesional para ayudarte a sentirte mejor en tu piel.",
    "La longevidad no es solo genética: también es cuidar, acompañar y potenciar lo que tu cuerpo necesita."
  ];
  const el = document.querySelector('.est-hero-rotating');
  if (!el) return;
  let i = 0;
  setInterval(function(){
    i = (i + 1) % phrases.length;
    el.style.transition = 'opacity 1.4s ease';
    el.style.opacity = '0';
    setTimeout(function(){
      el.textContent = phrases[i];
      requestAnimationFrame(function(){
        requestAnimationFrame(function(){
          el.style.opacity = '1';
        });
      });
    }, 1500);
  }, 6500);
})();
