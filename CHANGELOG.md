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
v0.8
### Agregado
- **Buscador y filtros dinámicos en Prácticas:** la sección de 
  prácticas pasó de un listado estático a un catálogo dinámico con 
  buscador (por nombre, descripción, especialidad o tipo), chips de 
  filtro por especialidad y por tipo de atención, y paginado 
  "Ver más" (de a 12 resultados). La barra de buscador+filtros queda 
  sticky debajo del navbar al scrollear, y el catálogo pasó a ocupar 
  todo el ancho de pantalla (full-bleed) para aprovechar mejor el 
  espacio en pantallas anchas.

  Se agregó el flag `turnoWeb` a las prácticas reservables desde el 
  Portal de Pacientes (20 de 72): el modal de detalle y el botón 
  principal cambian según corresponda (portal vs. WhatsApp).

  Motivo: facilitar que el paciente encuentre la práctica que 
  necesita sin tener que scrollear un listado largo, y dejar 
  preparado el catálogo para el trabajo de SEO que sigue.

- **72 páginas propias de práctica (`pages/practica-<slug>.html`) y 
  59 de profesional (`pages/profesional-<slug>.html`):** cada 
  práctica y cada profesional del sitio pasó a tener una ficha 
  estática propia, indexable individualmente por buscadores, con 
  `<title>`/meta description específicos y datos estructurados 
  JSON-LD (`MedicalProcedure` y `Physician` respectivamente).

  Motivo: antes las prácticas y los profesionales solo existían como 
  cards que abrían un modal generado por JavaScript — invisibles 
  para crawlers sin JS, y sin URL propia para compartir o indexar. 
  Cada card sigue abriendo el modal como antes (mejora progresiva: 
  el link real a la ficha se intercepta con JS), pero ahora también 
  existe una página real detrás de cada una.

- **`sitemap.xml` y `robots.txt`:** se generaron desde cero, listando 
  las 143 páginas del sitio (home + todo `pages/*.html`, incluidas 
  las 72 fichas de práctica y las 59 de profesional).

  Nota: usan `https://www.cgap.com.ar` como dominio de producción — 
  es un supuesto, falta confirmar el dominio real antes de enviar el 
  sitemap a Search Console.

- **Matrícula y horario de atención en las fichas de profesionales:** 
  se agregó el campo `matricula` (57 de 59 profesionales) y se 
  completó `horario` (mañana / tarde / mañana-tarde / a confirmar) 
  cruzando el listado real de horarios y prestadores de la clínica. 
  Se sumaron 2 profesionales que faltaban en el listado y se 
  excluyeron los que ya no están activos.

  Motivo: dar información más completa y confiable al elegir 
  profesional, y sumar contenido real (no genérico) a cada ficha 
  para SEO.

### Cambiado
- **Página "Profesionales" eliminada:** ya no existe una página 
  (ni una sección) dedicada a listar a todos los profesionales del 
  centro. Cada profesional se descubre desde la ficha de su 
  especialidad (`pages/especialidad-<nombre>.html`), que ya lista 
  sus profesionales y prácticas filtrados dinámicamente, o desde su 
  propia ficha indexable.

  Motivo: evitar contenido duplicado entre una página "hub" de 
  profesionales y las páginas de especialidad, y concentrar la 
  autoridad de SEO en las páginas de especialidad y de ficha 
  individual en vez de repartirla en un catálogo genérico.

- **`pages/practicas.html` renombrada a `pages/especialidades.html`:** 
  mismo contenido y comportamiento (cards de especialidades + 
  buscador/catálogo de prácticas), con las rutas internas y los 
  links del resto del sitio (navbar, footer, fichas de práctica y 
  de profesional) actualizados para apuntar al nuevo nombre.

  Motivo: el nombre "prácticas" ya no describía bien el contenido de 
  la página una vez que también agrupa las especialidades del 
  centro.
v0.9
### Cambiado
- **Rediseño de `pages/circuito.html`:** la sección "¿Cómo funciona?" 
  pasó de 4 pasos genéricos a un texto real del recorrido (recepción 
  y admisión, ingreso al consultorio, ecografías, laboratorio), con 
  la aclaración de que el circuito de la tarde reprograma el 
  laboratorio para otro día de 07:00 a 11:00 hs.

  Se agregó un efecto de scroll (`js/circuito.js`): al llegar a la 
  sección, la grilla 2x2 de pasos pasa a mostrar cada paso de a uno 
  en grande a medida que se scrollea (con una barra de progreso, un 
  indicador de pasos conectados por una línea con efecto "líquido", 
  y una barra de WhatsApp flotante), y se resuelve de nuevo en la 
  grilla 2x2 al terminar. Todo el contenido vive en el HTML desde el 
  arranque (no se inyecta por JS), así que sigue siendo indexable 
  aunque el efecto no se ejecute.

  El hero se simplificó: se sacó el label superior, el botón de 
  turno por el portal (queda solo WhatsApp) y el dato de "los 
  estudios pueden variar…", y el alto pasó del `min-height: 88vh` 
  original a uno definido por el contenido, igual criterio que el 
  hero del home.

  La sección "¿Qué incluye?" pasa a mostrar las 5 cards siempre en 
  una sola fila (antes eran una grilla fija de 5 columnas que 
  truncaba los títulos más largos), a todo el ancho de pantalla, y 
  se corrigieron dos íconos que no representaban el servicio 
  (ginecología y ecografía).

### Agregado
- **SEO de `circuito.html`:** título y meta description se 
  reescribieron para no competir por las mismas búsquedas que 
  `practica-circuito-ginecologico-completo.html` (antes eran casi 
  idénticos) — esta página apunta al "cómo funciona", la ficha de 
  práctica a los datos puntuales (duración, preparación, orden 
  médica) — y se cruzaron con un link en cada dirección. Se sumó 
  además un bloque JSON-LD `Service` (la ficha de práctica ya tenía 
  uno `MedicalProcedure`; se usó un tipo distinto a propósito, para 
  no duplicar la misma entidad).

- **`<link rel="canonical">` en las 143 páginas del sitio** (`index.html` 
  más todo `pages/*.html`), cada una apuntando a su propia URL — no 
  existía ninguno. De paso se detectó que `index.html` y 
  `pages/nosotros.html` no tenían `<meta name="description">` y se 
  les agregó uno.

  Nota: tanto los canonical como el `sitemap.xml` ya existente usan 
  `https://www.cgap.com.ar` como dominio de producción — sigue 
  siendo un supuesto sin confirmar (ver nota en `CLAUDE.md`).
v0.10
### Agregado
- **Modal "Turnos" en el navbar:** el botón "Turnos" (presente en 
  las 143 páginas) dejó de linkear directo al WhatsApp de 
  ginecología y ahora abre un modal (`#turnosModal`, 
  `styles/base/turnos-modal.css`) para elegir entre Ginecología y 
  demás especialidades o Medicina estética, cada una a su número de 
  WhatsApp correspondiente. El link directo se conserva como 
  `href` del botón (mejora progresiva: funciona igual si el JS no 
  corre).

  De paso se corrigió el número de WhatsApp usado en las 9 páginas 
  de estética (`medicina-estetica.html` y los 8 
  `profesional-<slug>.html` con `especialidad: "estetica"` en 
  `data.js`): su botón de turno propio y su pie de página ahora 
  usan el número de estética en vez del general de ginecología.

  Motivo: antes todas las consultas por WhatsApp —sin importar la 
  especialidad— caían en el mismo número, mezclando turnos de 
  estética con los del resto de las prácticas.

- **Preguntas frecuentes completas (`js/faq-data.js`):** se 
  reemplazaron los 12 placeholders `[completar...]` por información 
  real del sitio (WhatsApp, teléfono, dirección y horario, obras 
  sociales, formas de pago, accesibilidad, portal de pacientes, 
  excepción de orden médica del circuito ginecológico). Las 3 
  preguntas de diagnóstico por imágenes se reescribieron para 
  dirigir al usuario a la sección "Diagnóstico por imágenes" de 
  Servicios principales y a los canales de turno reales.

  Todas las respuestas que mencionan WhatsApp o teléfono pasaron a 
  ser links con mensaje de WhatsApp prearmado y texto tipo 
  "comunicate por WhatsApp" (sin mostrar el número), con una clase 
  visual propia (`.faq-link`) para que se distingan del texto 
  plano. Se agregó además un handler global para links 
  `data-scroll-close` dentro de las respuestas del FAQ, que cierran 
  el modal y scrollean a la sección referenciada.

  Motivo: el FAQ tenía datos de contacto sin completar desde su 
  creación, y los links de WhatsApp existentes no tenían ninguna 
  señal visual de que eran clickeables.

- **Columna "Especialidades" en el footer:** se sumó una tercera 
  columna con las 6 especialidades que tienen ficha propia 
  (Ginecología, Ecografía, Dermatología, Endocrinología, Nutrición, 
  Flebología), cada una linkeando a su `especialidad-<nombre>.html`, 
  en las 143 páginas del sitio.

### Cambiado
- **Rediseño del footer:** el logo pasó a ocupar 2/6 del ancho 
  (antes una fracción menor dentro de un layout flex) y se agrandó, 
  ahora centrado dentro de su columna. La columna "Secciones" se 
  reordenó a Inicio, Circuito, Especialidades, Medicina estética y 
  Nosotros. El layout pasó de flex a CSS Grid para poder controlar 
  las proporciones de columna con precisión.

  De paso se corrigieron dos inconsistencias que quedaban del 
  footer anterior: `pages/blog.html` tenía un 5° link 
  ("Blog & Tips") apuntando a sí misma en vez del set estándar de 
  Secciones, y `pages/circuito.html` tenía una clase `active` sin 
  ningún efecto CSS en su propio link. Ambas quedaron alineadas al 
  resto del sitio.

- **Grid "Servicios principales" (home):** las 6 cards pasaron de 
  una grilla de 4 columnas (con las 2 cards magenta ocupando una 
  fila aparte) a 2 columnas independientes (`.prest-col`), cada una 
  con sus 3 cards en flujo normal. Antes, al hacer hover sobre una 
  card, la fila completa de la grilla se estiraba (CSS Grid iguala 
  el alto de fila a la celda más alta) dejando un espacio vacío del 
  lado sin mouse; ahora cada columna crece de forma independiente.

- **Botón flotante de WhatsApp eliminado:** se sacó el botón 
  `wa-float` (y su hoja `styles/base/wa-float.css`) de las 143 
  páginas del sitio.

  Motivo: quedaba redundante con el botón "Turnos" del navbar, que 
  ahora además permite elegir la especialidad correcta en vez de 
  mandar todo al WhatsApp general.