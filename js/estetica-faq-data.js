/* ============================================================
   CGAP · estetica-faq-data.js
   Preguntas frecuentes específicas de medicina estética, extraídas del
   documento de referencia para secretarías (PDF "Datos Estetica") — no
   forman parte de window.FAQ_DATA (js/faq-data.js) porque esa lista está
   acotada a las 6 áreas del buscador de FAQ del home (ver CLAUDE.md);
   esta es una lista aparte para usar en pages/medicina-estetica.html.
   Cada item tiene:
     area:      "turnos-y-pagos" | "primera-consulta" | "depilacion" | "tratamientos"
     titulo:    la pregunta
     contenido: la respuesta completa
   ============================================================ */
window.FAQ_ESTETICA = [
  // ---------- Turnos y pagos ----------
  { area: "turnos-y-pagos", titulo: "¿Qué medios de pago aceptan en medicina estética?", contenido: "Aceptamos efectivo y transferencia bancaria." },
  { area: "turnos-y-pagos", titulo: "¿Puedo hacer una consulta por telemedicina?", contenido: "Sí, coordinamos consultas de telemedicina con la profesional correspondiente. Te confirmamos el valor de la consulta y el medio de pago al coordinar el turno." },
  { area: "turnos-y-pagos", titulo: "¿Cómo reagendo o cancelo un turno de estética?", contenido: "Escribinos con anticipación indicando tu DNI y los días/horarios en los que preferís venir, así podemos reprogramarlo o liberar el turno para otra paciente." },

  // ---------- Primera consulta ----------
  { area: "primera-consulta", titulo: "¿Qué datos me piden si es mi primera vez en CGAP Estética?", contenido: "Te pedimos DNI, nombre y apellido, teléfono, obra social (si tenés), mail y fecha de nacimiento." },
  { area: "primera-consulta", titulo: "¿Quién realiza los tratamientos médicos estéticos?", contenido: "Los tratamientos médicos (inyectables, láser y tecnología) están a cargo de médicas especialistas en medicina estética; los tratamientos cosmetológicos (higiene facial, cejas, pestañas) están a cargo de nuestras cosmiatras." },

  // ---------- Depilación definitiva ----------
  { area: "depilacion", titulo: "¿Qué debo hacer antes de una sesión de depilación definitiva?", contenido: "Rasurate la noche anterior o el mismo día (si tu piel no es irritable), con prolijidad y cuidado en las zonas más delicadas, usando una máquina de afeitar nueva para evitar cortes o infecciones. No coloques cremas ni desodorante en las zonas a depilar con láser. Cuidate del sol 3 días antes y 3 días después de la sesión, y traé ropa cómoda." },
  { area: "depilacion", titulo: "¿Cuántas sesiones de depilación definitiva necesito y cada cuánto son?", contenido: "Las sesiones tienen un período de 1 mes entre sí. La cantidad depende de cómo responde cada organismo al láser, y se estiman entre 4 y 5 sesiones." },
  { area: "depilacion", titulo: "¿Es normal que vuelva a crecer vello entre sesiones o sentir picazón?", contenido: "Sí. Es normal tener un segundo crecimiento entre la 3ª y 5ª sesión — no significa que el tratamiento no esté funcionando, es parte del proceso. También puede haber prurito o picazón leve según la potencia usada y el rasurado previo." },

  // ---------- Tratamientos ----------
  { area: "tratamientos", titulo: "¿Qué incluye una higiene facial en CGAP?", contenido: "La limpieza facial incluye exfoliación, punta de diamante, máscara ablandadora, un ácido según tu tipo de piel y necesidades, extracciones manuales, alta frecuencia, descongestión e hidratación con máscara y principios activos específicos, y finaliza con protector solar. Todas las limpiezas incluyen máscara LED para potenciar los resultados; las variantes con dermapen, radiofrecuencia, jelly mask, reflexología o peeling suman ese equipo o complemento adicional." },
  { area: "tratamientos", titulo: "¿Cuánto dura el efecto de tratamientos como Hidralips o Hidralids?", contenido: "Son totalmente indoloros y ambulatorios; la inflamación solo dura unas horas. La hidratación dura hasta 3 meses, notándose más en el primer mes, y luego queda un residuo que sigue hidratando durante dos meses más." },
  { area: "tratamientos", titulo: "¿Cuántas sesiones necesito para eliminar un tatuaje?", contenido: "La eliminación de tatuajes con láser Spectra es gradual: se necesitan entre 4 y 7 sesiones, cada 28-40 días, según la respuesta de tu piel. El resultado óptimo es la eliminación completa, aunque en tatuajes con tinta más profunda o zonas remarcadas puede quedar una sombra." },
  { area: "tratamientos", titulo: "¿Cada cuánto son las sesiones de mesoterapia?", contenido: "Se realizan cada 7 a 15 días, generalmente entre 6 y 10 sesiones según la necesidad de cada paciente." },
  { area: "tratamientos", titulo: "¿El Botox tiene resultados inmediatos?", contenido: "Los resultados suelen verse en unos pocos días y alcanzan su máximo efecto en 1 a 2 semanas. La duración varía de persona a persona, pero generalmente dura entre 3 y 6 meses." }
];
