# Changelog — CGAP Web

Registro de cambios y motivos, para trazabilidad del proceso de optimización.
v0.1
### Cambiado
- **Estructura de assets (CSS/JS):** se dividieron `styles.css` y 
  `app.js` monolíticos en archivos separados por página/uso, 
  organizados en `styles/` y `js/`.
  
  Motivo: todas las páginas cargaban el CSS/JS completo del sitio 
  aunque solo usaran una fracción, generando peso de carga 
  innecesario. Ahora cada página solo importa lo que necesita.
  
  Impacto esperado: mejora en tiempos de carga y Core Web Vitals 
  (especialmente LCP), con beneficio indirecto en SEO.
v0.2
### Cambiado
- **Distribución de los elementos del navbar:** se reordenaron los 
  links (Inicio, Circuito, Especialidades, Medicina estética, 
  Nosotros), se centró el menú respecto al ancho completo de la 
  barra, se corrió el logo hacia la derecha y se ajustó el tamaño 
  de navbar, logo y botones.

  Motivo: mejorar el estilo visual de la barra de navegación.

- **Color de los botones del navbar:** "Portal de Pacientes" se 
  mantiene sólido en magenta y "Turnos" pasó a un estilo outline 
  (borde fino, fondo transparente).

  Motivo: darle más jerarquía e importancia visual al botón de 
  Portal de Pacientes por sobre el de Turnos.

- **Estado de página activa y barra de progreso de scroll:** se 
  agregó `aria-current="page"` al link activo en el HTML de cada 
  página, se cambió su marcador visual (línea sólida debajo en vez 
  de fondo con color) y se sumó una línea de progreso de scroll 
  debajo del navbar.

  Motivo: mejorar el SEO (semántica de navegación) y ayudar a la 
  orientación del usuario dentro de la página.
v0.3
### Agregado
- **Interactividad en "Servicios principales":** las 6 cards ahora 
  revelan descripción y CTA con hover (efecto breathe coordinado), 
  y al hacer click abren un modal con información operativa 
  (cómo reservar cada tipo de turno, links a especialidades y 
  obras sociales).

  Motivo: dar una experiencia más dinámica tipo "galería" sin perder 
  contenido indexable — el texto principal de cada servicio 
  permanece en el HTML desde el inicio, independiente de la 
  interacción.

  Pendiente: definir comportamiento específico para mobile (sin 
  hover disponible), a resolver en una iteración aparte.
v0.4
### Cambiado
- **Sección de reseñas (index):** se reemplazó el bloque estático 
  de reseñas curadas (4 reseñas fijas, editadas a mano en el HTML) 
  por un carrusel dinámico armado desde `js/reviews-data.js` — 184 
  reseñas reales de Google scrapeadas, con nombre, estrellas, texto, 
  fecha, foto de perfil y link de verificación a la reseña original.

  Filtros usados: se descartan las reseñas sin texto (85 de 184, 
  solo puntuación sin comentario) y se muestran las 99 restantes — 
  todas, no una selección — mezcladas al azar (Fisher-Yates) en cada 
  carga de página, sin ordenar ni filtrar por calificación.

  Motivo: la sección anterior mostraba únicamente 4 reseñas 
  elegidas a mano, lo que reintroducía el mismo riesgo de 
  transparencia que motivó a eliminarla en una iteración previa. 
  Mostrar el conjunto completo, en orden aleatorio, evita esa 
  percepción de curaduría.

  Comportamiento del carrusel: ocupa el ancho completo de la 
  pantalla (rompe el `.wrap` central) para aprovechar el espacio en 
  pantallas anchas. Tiene auto-scroll continuo a velocidad baja 
  (~33px/s) con loop infinito (el set de cards se duplica en el DOM 
  para que el reinicio del scroll sea imperceptible). Las flechas 
  de navegación manual siguen disponibles y pausan el auto-scroll 
  por 7 segundos al usarse.

  Cada card muestra: foto de perfil (con fallback a iniciales si la 
  imagen de Google no carga), nombre, fecha, texto truncado a 3 
  líneas, estrellas y un link "Ver en Google →" a la reseña 
  original — nada se trunca, resume o reescribe.

- **Botón "Dejá tu reseña":** se sacó el formulario propio (posteaba 
  por email a través de formsubmit.co, no publicaba nada en Google 
  ni en el sitio) y se reemplazó por un link directo al cuadro 
  oficial de reseña de Google (`g.page/r/.../review`), que abre en 
  una ventana emergente chica centrada sobre el sitio.

  Motivo: Google no permite publicar reseñas de terceros vía 
  formulario propio — la única forma legítima de que una reseña 
  quede publicada es que el usuario la escriba directamente en 
  Google. El formulario anterior generaba la falsa impresión de que 
  la reseña se publicaba, cuando en realidad solo llegaba como 
  email privado.
v0.5
### Cambiado
- **Sección FAQ (index):** se reemplazaron las tabs 
  "Institucionales"/"Médicas" con acordeón estático por un buscador 
  general (busca por área, título y contenido, y devuelve resultados 
  por título que abren un modal con la respuesta completa) y 6 
  mosaicos por área — Ginecología, Institucional, Diagnóstico por 
  imágenes, Laboratorio, Portal de pacientes y Otras especialidades 
  — cada uno con su propio modal, acordeón y buscador acotado a esa 
  área.

  Las preguntas se migraron de HTML estático a `js/faq-data.js` como 
  lista de `{area, titulo, contenido}` (34 preguntas: las 29 
  originales reclasificadas por área más 5 nuevas para cubrir 
  Diagnóstico por imágenes y Portal de pacientes).

  Los modales de categoría tienen alto máximo (85vh) con scroll 
  interno para las áreas con más preguntas, con indicador visual 
  (flecha + degradé) de que hay más contenido para scrollear.

  Motivo: ayuda a la navegación entre preguntas frecuentes, y 
  mejora la estructuración y la optimización de SEO al poder 
  gestionar la información de forma más fácil.
v0.6
### Cambiado
- **Sección Contacto (index):** el mapa pasó a ocupar todo el ancho 
  de pantalla (rompe el `.wrap`) y se redujo su alto. Las 6 cards de 
  información se reorganizaron en un grid de 3 columnas: Horarios y 
  Ubicación apiladas a la izquierda, Teléfono y WhatsApp en fila en 
  el centro (con el formulario debajo), e Instagram y YouTube 
  apiladas a la derecha.

- **Formulario de contacto:** cambió el destino de 
  `zalazarmisael7@gmail.com` a `soporte@cgap.com.ar`. El envío pasó 
  de ser un POST tradicional (redirigía a una página de formsubmit.co) 
  a un envío por AJAX con confirmación inline en la misma sección — 
  muestra un mensaje de éxito o de error sin salir de la página, y 
  ante un error ofrece un link directo a WhatsApp como alternativa.

  Se agregó un límite de una consulta por día por navegador, 
  guardado en `localStorage`: si ya se envió una consulta en las 
  últimas 24 hs, el formulario se oculta automáticamente y se 
  muestra el mensaje de confirmación en su lugar.
v0.7
### Cambiado
- **Orden de secciones (index):** se reordenó la página a Hero → 
  Prestaciones → Obras sociales → FAQ → Reseñas → Novedades → 
  Contacto (antes: Hero → Prestaciones → Novedades → Reseñas → 
  Obras sociales → FAQ → Contacto).

- **Modales de "Servicios principales":** se agregaron mensajes de 
  WhatsApp prearmados específicos por servicio (consulta, ecografía, 
  estética) en vez de un texto genérico. El modal de "Diagnóstico 
  por imágenes" ahora enlaza "gran variedad de ecografías" y 
  "requerimientos y la preparación" a la página de especialidades. 
  El botón de WhatsApp del modal de "Medicina estética" pasa a usar 
  el número específico de estética en vez del número general de 
  ginecología.

- **Contacto:** el número de WhatsApp de Estética se actualizó a 
  +54 9 351 507-9519 (antes usaba el mismo número que Ginecología 
  como placeholder). Los links de Instagram del sitio (card de 
  contacto y CTA de Novedades) pasan a apuntar a la cuenta real 
  `@cgap.ginecoestetica`.