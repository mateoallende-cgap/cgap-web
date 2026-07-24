/* ============================================================
   CGAP · faq-data.js
   Preguntas frecuentes — cada item tiene:
     area:      slug del área de consulta (coincide con los data-area
                de las 6 mosaicos del FAQ: ginecologia, institucional,
                diagnostico, laboratorio, portal, otras)
     titulo:    la pregunta — es lo único que se muestra en resultados
                de búsqueda
     contenido: la respuesta completa (se muestra en el modal)
   ============================================================ */
window.FAQ_DATA = [
  // ---------- Institucional ----------
  { area: "institucional", titulo: "¿Cómo saco un turno?", contenido: "Podés sacar turno por WhatsApp: <mark>[completar número]</mark>, por nuestro sistema de turnos online: <mark>[completar]</mark> o llamando al teléfono: <mark>[completar]</mark>. Te confirmamos día y horario en el momento." },
  { area: "institucional", titulo: "¿Qué obras sociales y prepagas atienden?", contenido: "Trabajamos con <mark>[listar obras sociales y prepagas]</mark>. Si no ves la tuya, escribinos y te confirmamos al instante." },
  { area: "institucional", titulo: "¿Atienden de forma particular, sin obra social?", contenido: "Sí, también atendemos en forma particular. Consultá los valores actualizados por <mark>[WhatsApp / completar]</mark>." },
  { area: "institucional", titulo: "¿Qué tengo que llevar a mi turno?", contenido: "DNI, credencial de tu obra social o prepaga, la orden médica si corresponde y, si los tenés, estudios previos relacionados con la consulta." },
  { area: "institucional", titulo: "¿Dónde están y qué horarios tienen?", contenido: "Estamos en <mark>[dirección: completar]</mark>. Atendemos <mark>[días y horarios: completar]</mark>." },
  { area: "institucional", titulo: "¿Puedo reprogramar o cancelar un turno?", contenido: "Sí. Te pedimos avisarnos con <mark>[X horas / completar]</mark> de anticipación así podemos liberar el turno para otra paciente." },
  { area: "institucional", titulo: "¿Atienden el mismo día o urgencias?", contenido: "<mark>[Completar según política de la clínica]</mark>. Para una consulta que no puede esperar, escribinos y vemos la disponibilidad más cercana." },
  { area: "institucional", titulo: "¿Atienden a adolescentes?", contenido: "Sí. <mark>[Completar política]</mark>: en general las menores deben venir acompañadas por madre, padre o tutor/a según el tipo de consulta." },
  { area: "institucional", titulo: "¿Qué formas de pago aceptan?", contenido: "<mark>[Efectivo, débito, crédito, transferencia, cuotas — completar]</mark>." },
  { area: "institucional", titulo: "¿Tienen estacionamiento y acceso para movilidad reducida?", contenido: "<mark>[Completar: estacionamiento, rampa, ascensor, accesibilidad]</mark>." },

  // ---------- Ginecología ----------
  { area: "ginecologia", titulo: "¿Cada cuánto debo hacerme un PAP?", contenido: "En general se recomienda un control ginecológico anual. La frecuencia exacta del PAP la define tu médico/a según tu edad e historia. Lo importante es no dejar pasar el control de cada año." },
  { area: "ginecologia", titulo: "¿A qué edad empiezo los controles ginecológicos?", contenido: "Suelen iniciarse en la adolescencia o al comenzar la vida sexual, pero cada caso es particular. Ante cualquier síntoma o duda, no hace falta esperar una edad determinada para consultar." },
  { area: "ginecologia", titulo: "¿El PAP duele?", contenido: "Suele ser una molestia breve más que un dolor, y dura pocos minutos. Si te genera ansiedad, contale a tu profesional: hay formas de hacerlo más cómodo." },
  { area: "ginecologia", titulo: "¿Puedo hacerme el PAP si estoy menstruando?", contenido: "Lo ideal es hacerlo fuera de los días de sangrado. Si tenés el turno y te vino la menstruación, escribinos para reprogramar." },
  { area: "ginecologia", titulo: "¿Es normal el dolor menstrual fuerte?", contenido: "Un cólico leve puede ser normal, pero un dolor que te incapacita o te hace faltar a tus actividades no debería naturalizarse: merece una consulta para estudiar la causa." },
  { area: "ginecologia", titulo: "¿Cada cuánto debo controlarme las mamas?", contenido: "Depende de tu edad y antecedentes. El autoexamen mensual es un buen hábito, y la frecuencia de los estudios la indica tu médico/a en la consulta." },
  { area: "ginecologia", titulo: "¿Qué es el HPV y cómo se previene?", contenido: "Es un virus muy frecuente: la mayoría de las personas tiene contacto con él en algún momento. El control ginecológico regular y la vacuna son las mejores herramientas de prevención." },
  { area: "ginecologia", titulo: "¿Cuándo conviene consultar por ciclos irregulares?", contenido: "Si tus ciclos son muy irregulares de forma sostenida, conviene consultar para descartar causas como alteraciones hormonales o síndrome de ovario poliquístico (SOP)." },
  { area: "ginecologia", titulo: "¿Qué incluye el circuito ginecológico?", contenido: "Es un control integral que puede combinar examen ginecológico, control mamario, ecografía si corresponde y solicitud de análisis, resolviendo varias cosas en una misma visita." },

  // ---------- Diagnóstico por imágenes ----------
  { area: "diagnostico", titulo: "¿Qué tipos de estudios de diagnóstico por imágenes realizan?", contenido: "Ofrecemos una gran variedad de ecografías (transvaginal, obstétrica, mamaria y más) y estudios especializados según indicación médica, con equipamiento de alta precisión." },
  { area: "diagnostico", titulo: "¿Necesito preparación previa para una ecografía?", contenido: "La preparación depende del estudio — te la confirmamos al coordinar el turno." },
  { area: "diagnostico", titulo: "¿Cómo saco un turno para una ecografía?", contenido: "Los turnos para estudios de diagnóstico por imágenes se coordinan por WhatsApp o desde el portal de pacientes." },

  // ---------- Laboratorio ----------
  { area: "laboratorio", titulo: "¿Cuánto tardan los resultados de laboratorio?", contenido: "Los análisis de rutina suelen estar listos en <mark>[24 a 72 hs / completar]</mark>. Los estudios especiales pueden demorar más. Al dejar tu muestra te informamos la fecha estimada de entrega." },
  { area: "laboratorio", titulo: "¿Necesito orden médica para hacerme análisis?", contenido: "Para la mayoría de los estudios sí necesitás una orden. <mark>[Aclarar excepciones / chequeos del circuito]</mark>. Ante dudas, escribinos antes de tu turno." },
  { area: "laboratorio", titulo: "¿Necesito ayuno para los análisis de sangre?", contenido: "Algunos estudios requieren ayuno (en general de 8 a 12 hs) y otros no. Al sacar el turno te indicamos la preparación exacta según los análisis pedidos." },

  // ---------- Portal de pacientes ----------
  { area: "portal", titulo: "¿Cómo accedo a mis resultados?", contenido: "Podés acceder <mark>[vía portal online / por email / de forma presencial — completar]</mark>. Te avisamos cuando estén disponibles." },
  { area: "portal", titulo: "¿Cómo accedo al portal de pacientes?", contenido: "Si es tu primera vez, podés crear una cuenta ingresando tus datos para solicitar un turno. Si ya te has atendido, ingresá con tu DNI como usuario y contraseña." },
  { area: "portal", titulo: "¿Qué puedo hacer desde el portal de pacientes?", contenido: "Podés consultar tus turnos, resultados de laboratorio, ecografías e informes, y acceder a recetas u órdenes médicas digitales, disponible las 24 horas." },

  // ---------- Otras especialidades ----------
  { area: "otras", titulo: "¿La depilación definitiva es para siempre?", contenido: "Logra una reducción muy importante y duradera del vello. Suele requerir varias sesiones y, según cada persona, algún mantenimiento posterior. El profesional te orienta en la evaluación inicial." },
  { area: "otras", titulo: "¿Cuántas sesiones de depilación definitiva necesito?", contenido: "Varía según la zona, el tipo de piel y de vello. En general son varias sesiones espaciadas en el tiempo; el número se define en la consulta inicial." },
  { area: "otras", titulo: "¿Los tratamientos estéticos tienen tiempo de recuperación?", contenido: "Depende del tratamiento: algunos no requieren reposo y otros, como ciertos láseres, tienen unos días de cuidados. Te explicamos todo antes de empezar." },
  { area: "otras", titulo: "¿Qué es el PRP (plasma rico en plaquetas)?", contenido: "Es un tratamiento que utiliza componentes de tu propia sangre para estimular la regeneración de la piel. El profesional evalúa en la consulta si es adecuado para vos." },
  { area: "otras", titulo: "¿Puedo hacerme tratamientos estéticos si estoy embarazada o amamantando?", contenido: "Muchos tratamientos no se recomiendan durante el embarazo o la lactancia. Avisá siempre tu situación en la consulta para que el profesional te indique qué es seguro." },
  { area: "otras", titulo: "¿Cada cuánto debo controlar mis lunares?", contenido: "Un control dermatológico anual es una buena pauta general, y antes si notás cambios de color, tamaño, forma o bordes en algún lunar." }
];
