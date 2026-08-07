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
v0.11
### Cambiado
- **Navbar responsive, de un solo corte a 980px a una reducción 
  progresiva:** `.nav-links` dejó de centrarse con `position:absolute` 
  sobre todo el ancho del navbar (lo que podía superponerse con el 
  logo o los botones antes de llegar a los 980px) y pasó a ser un 
  ítem flex (`flex:1` + `justify-content:center`) que se centra en el 
  espacio real disponible entre logo y botones.

  Se sumaron 4 escalones intermedios en `styles/responsive/base.css`, 
  calibrados contra roturas reales encontradas con las devtools:
  - `1600px` y `1300px`: se achican fuente y padding de los links y 
    los botones del navbar grande (antes solo existían para el 
    estado "scrolleado"; ahora ambos estados reducen igual).
  - `980px` (colapso a menú hamburguesa): "Turnos" y "Portal de 
    Pacientes" quedan visibles junto al logo y el botón de menú (antes 
    "Portal de Pacientes" se ocultaba directamente).
  - `560px`: el logo pierde su margen izquierdo y "Turnos" se achica 
    más que el resto de los botones, para que los 2 botones sigan 
    entrando junto al menú.
  - `460px` (hasta 320px): el logo se achica más y "Portal de 
    Pacientes" vuelve a ocultarse de la barra, quedando accesible solo 
    dentro del menú hamburguesa desplegado — mismo mecanismo que ya 
    existía, ahora reservado para el rango realmente angosto.

- **Hero de home (`index.html`) en el corte de 980px:** en vez de solo 
  apilar en columna, el párrafo descriptivo se oculta, el listado de 
  estudios pasa a mostrarse antes que el link "Conocer más" 
  (`order:-1`), y ambos bloques comparten un margen izquierdo fluido 
  (`clamp(1rem,9vw,6rem)`) que se acerca a la mitad de la primera 
  palabra del título en pantallas con espacio y se reduce a un margen 
  chico en las angostas. También se sacó la altura fija de 220px de 
  `.hero-static-row`/`.hero-static-col` (heredada del layout de 
  escritorio en fila), que dejaba muy poco lugar al contenido apilado.
v0.12
### Cambiado
- **"Servicios principales" (home) en desktop:** las 4 cards con foto
  (arriba) bajaron de altura para no quedar desproporcionadas respecto
  a las 2 cards magenta de abajo, recuperaron el efecto hover (foco al
  pasar el mouse, igual que las de abajo) y las 2 cards magenta suman
  un divisor fino entre el título y el texto.

  Motivo: las cards de arriba ocupaban más alto del necesario para su
  contenido, y habían perdido el hover en una iteración previa.

- **FAQ, reseñas y formulario de contacto (home):** se sacó el tag
  "Centro de ayuda" de la sección de preguntas frecuentes; la sección
  de reseñas pasó a tener "Reseñas de pacientes" como título y "Lo que
  dicen nuestras pacientes" como bajada (antes al revés); las cards de
  reseña se achican en mobile; el formulario de contacto se oculta por
  completo en mobile (≤770px) y se mantiene en tablets (771–1024px, el
  corte "mobile" del sitio se extendió de 980 a 1024px para
  incluirlas), con menos padding y un textarea más corto.

  Motivo: prolijidad de jerarquía visual (título/subtítulo) y ahorro
  de espacio en pantallas chicas, donde un formulario completo
  compite mal con el resto del contenido.

- **Sección de contacto (home) — rediseño completo:** se reemplazaron
  las 6 cards con borde/sombra y el mapa embebido por una única "hoja
  informativa" sin bordes ni cards (título "Medios de contacto" con
  bajada propia), con el formulario a la derecha y los datos a la
  izquierda. "Horarios" ahora linkea al perfil de Google Business y
  "Ubicación" a Google Maps (antes texto/iframe estáticos), y se
  sumaron los 2 números de WhatsApp (Gineco/Estética) debajo del de
  contacto general, separados de los datos de atención (horario/
  dirección).

  Motivo: el mapa embebido pesaba y visualmente competía con la
  info de al lado; separar "medios de contacto" (a quién escribirle)
  de "atención" (cuándo/dónde) es más claro que mezclarlo todo en
  cards sueltas, y que horario/ubicación abran directamente el perfil
  de comercio de Google es más útil que un texto plano.

- **Footer (las 143 páginas del sitio):** la columna "Atención" se
  separó en dos: "Atención" (horario + dirección) y "Contacto"
  (teléfono, WhatsApp Gineco, WhatsApp Estética, email), pasando el
  footer de 3 a 4 columnas.

  Motivo: el footer solo tenía cargado el WhatsApp "de turno" según
  la página (gineco o estética) y no el teléfono/mail en todas
  partes; ahora cualquier página expone los mismos 4 medios de
  contacto completos.

- **`pages/circuito.html` — responsive y bug de superposición:** el
  corte a columna de "¿Qué incluye?" pasó de 900 a 1024px (mismo
  criterio de "mobile hasta tablets" que el resto del sitio), y se
  corrigió un bug real donde la barra de WhatsApp flotante (fija al
  pie de pantalla durante el scroll-jacking de "¿Cómo funciona?")
  quedaba superpuesta al contenido en resoluciones angostas o bajas.
  `computeStickyH()` (`js/circuito.js`) ahora mide la altura natural
  real de ambas variantes del bloque (paso grande y grilla 2x2
  resuelta) y usa la más alta de las dos contra el espacio disponible,
  en vez de calcular solo en base al espacio libre.

  Motivo: el espacio disponible calculado (viewport − navbar − barra
  de WhatsApp) podía ser menor al contenido real en pantallas cortas
  o angostas, y como el `overflow:hidden` se había sacado antes para
  no cortar títulos, el desborde tapaba visualmente la barra de
  WhatsApp y el contenido de abajo.

- **`pages/especialidades.html` — grillas responsive:** tanto la
  grilla de "Nuestras especialidades" (`.prac2-esp-grid`) como el
  catálogo de "Prácticas y estudios" (`.prac-grid`) pasaron de
  `auto-fit` (que daba conteos de columna erráticos según el ancho) a
  escalones fijos con `repeat(N, Xpx)` + `justify-content:center`,
  sincronizados con la paginación de "Ver más" (`pageSize()` en
  `js/practicas.js`, antes un valor fijo de 12): 2/3 columnas en
  mobile y tablet, 4/5 en notebooks, 6 en desktop grande (≥1851px).
  También se corrigió el corte de los botones del hero (se estiraban
  de más por debajo de 780px) y se igualó el alto del hero al de
  home, con el mismo tamaño de título en toda la página y "CGAP"
  resaltado en magenta dentro del `<h1>`.

  Motivo: `auto-fit` con cards de ancho fijo genera cualquier cantidad
  de columnas según el ancho disponible (ej. 5+1 en vez de 3+3), lo
  que se ve desprolijo y no coincide con la paginación de a "filas
  completas" que espera el botón "Ver más". Fijar columnas por
  escalón da control total sobre cuántas cards entran por fila en
  cada rango.

- **`pages/especialidad-*.html` (las 6 páginas por especialidad) —
  rediseño y fix de resize:** se sacó el botón "Solicitar turno por
  WhatsApp" de la banda superior (que quedó sin fondo, solo con el
  link "← Todas las especialidades") y el título de la página se
  reubicó a la izquierda, ahora dentro de un hero propio con degradé
  suave, una etiqueta "Especialidad médica" arriba y el título en
  magenta oscuro. Los títulos de listado dejaron de repetir el nombre
  de la especialidad ("Profesionales de Ginecología" → "Profesionales")
  y pasaron a estar centrados, igual que la fila de cards debajo. Se
  sumó `styles/responsive/especialidad.css` para achicar
  progresivamente esas cards en pantallas chicas. Además,
  `limitarAUnaFila()` (`js/especialidad.js`) ahora vuelve a medir
  cuántas cards entran por fila en cada resize (antes solo al cargar
  la página, vía `requestAnimationFrame` una única vez), preservando
  el estado expandido/colapsado del botón "Ver más" al hacerlo.

  Motivo: al no remedir en resize, cards que habían quedado visibles
  con el ancho de carga inicial pasaban a envolver en varias filas si
  el usuario después achicaba la ventana, rompiendo la promesa de
  "una sola fila + Ver más". El resto es una limpieza visual pedida
  para que la página no dependiera de repetir el nombre de la
  especialidad en cada título ni de un botón de WhatsApp redundante
  (ya está la banda de cierre, ver abajo).

- **Fichas de práctica (`pages/practica-*.html`) — carrusel en
  mobile:** el carrusel de "Otras prácticas de [especialidad]" al pie
  de cada ficha achica sus cards de 280px a 220px por debajo de
  768px, con menos padding, texto más chico y flechas de navegación
  más pequeñas.

  Motivo: en celular, una card de 280px ocupa la enorme mayoría del
  ancho de pantalla, dando una sensación de carrusel "roto" o
  desproporcionado respecto al resto de la ficha.

### Agregado
- **SEO — home (`index.html`):** meta description (la página no tenía
  ninguna) y JSON-LD `MedicalClinic` con dirección, geolocalización,
  horario y redes.

- **SEO — `pages/circuito.html`:** JSON-LD `HowTo` con los 4 pasos del
  circuito (mismo texto que ya está en pantalla), sin tocar el
  `Service` existente.

- **SEO — `pages/especialidades.html`:** la meta description bajó de
  184 a 154 caracteres (se cortaba en los resultados de búsqueda), y
  se sumó JSON-LD `BreadcrumbList` (Inicio → Especialidades y
  prácticas) — la única página principal que no tenía ningún dato
  estructurado.

- **`pages/especialidad-*.html`:** banda de cierre "¿Querés asistencia
  para sacar tu turno?" (mismo componente `.prac2-nosabe` que ya
  existía en `especialidades.html`, con el mismo `--plum` del footer)
  con un link de WhatsApp cuyo mensaje pre-armado nombra la
  especialidad de la página ("...mi turno de Ginecología.", etc.).

  Motivo: cerrar cada página de especialidad con la misma invitación a
  contacto que ya usa el catálogo general, en vez de dejarla terminar
  abruptamente después del listado de prácticas.
v0.13
### Agregado
- **`pages/medicina-estetica.html` — catálogo dinámico de
  tratamientos:** nuevo hero (sin eyebrow, botón "Consultar por
  WhatsApp" como principal y "Tratamientos Estéticos" como secundario)
  y una sección "Tratamientos estéticos" con buscador + filtros por
  categoría (sticky) y catálogo paginado de los 120 tratamientos de
  `js/estetica-data.js`, con modal de detalle — mismo patrón que el
  catálogo de `especialidades.html`.

  Motivo: reemplazar el bloque estático "También podés consultar por"
  por un catálogo real, filtrable y con ficha propia por tratamiento.

- **63 fichas individuales `pages/tratamiento-<slug>.html`:** una
  página estática por cada tratamiento estético (excepto depilación,
  ver abajo), con descripción, beneficios, foto del equipo cuando hay
  una disponible y carrusel de "otros tratamientos" de la misma
  categoría.

  Motivo: igual que `practica-*.html`/`profesional-<slug>.html`, para
  que cada tratamiento sea indexable individualmente en vez de existir
  solo como card+modal generado por JS.

- **`pages/tratamiento-depilacion-definitiva.html` — página combinada
  interactiva:** hero con switch femenina/masculina (repinta toda la
  página de rosa a celeste), un mapa de cuerpo en SVG armado a mano a
  partir de piezas reales (cabeza/torso/cadera/piernas/pies/brazos) con
  6 zonas clickeables, ticker con los nombres de las 57 zonas del
  género elegido, buscador + filtros + catálogo de cards (con
  descripción truncada a 4 líneas con degradé y "Ver más" propio de
  cada card) y un CTA final a WhatsApp.

  Motivo: reunir las 57 zonas de depilación (34 femeninas + 23
  masculinas) en una sola experiencia navegable en vez de una lista
  plana, ya que no tienen ficha individual propia (ver siguiente
  punto).

- **57 fichas SEO-only `pages/tratamiento-depilacion-<femenina|
  masculina>-<zona>.html`:** una página estática por zona de
  depilación, cada una con su propio título/meta description/H1/
  JSON-LD `MedicalProcedure`, pensadas para indexación en buscadores.
  A propósito no están linkeadas desde ningún lugar del sitio (las
  cards de la página combinada van directo a WhatsApp, y el catálogo
  de medicina estética sigue mandando todo lo de depilación a la
  página combinada); solo `sitemap.xml` las referencia.

  Motivo: las 57 zonas solo existían como cards generadas por JS sin
  URL/título propios, así que ninguna búsqueda específica por zona
  ("depilación axilas Córdoba", etc.) tenía una página del sitio para
  matchear. Se mantienen fuera de la navegación a pedido explícito,
  para no competir con la página combinada ni saturar el menú.

- **Modo "swipe" en mobile para los catálogos con buscador
  (`especialidades.html`, `medicina-estetica.html`,
  `tratamiento-depilacion-definitiva.html`):** por debajo de 768px el
  catálogo arranca como una sola fila horizontal que se recorre
  arrastrando el dedo (scroll nativo con snap), en vez de la grilla
  envuelta de varias filas. El botón "Ver más" pasa a "Ver en
  cuadrícula"; una vez en cuadrícula pagina de a 4 y solo ofrece "Ver
  menos" cuando ya no queda nada más para mostrar, y en ese caso vuelve
  al modo swipe.

  Motivo: en pantallas angostas, la grilla envuelta podía mostrar más
  de las 2 filas esperadas según cuántas columnas entraran; el modo
  swipe además es una interacción más natural en celular que tocar
  flechas.

- **`js/ticker.js`:** refuerzo compartido para el loop infinito de
  `.ticker-track` (usado en home, especialidades, medicina estética,
  circuito y depilación): si el contenido no llega a cubrir 2 veces el
  ancho visible (listas cortas o pantallas muy anchas), duplica el
  bloque completo las veces que hagan falta.

  Motivo: con listas cortas o monitores grandes, la animación dejaba
  un tramo en blanco al final de cada vuelta en vez de texto
  continuo.

### Cambiado
- **Botones del hero de `pages/medicina-estetica.html`:** "Consultar
  por WhatsApp" y "Tratamientos Estéticos" quedaban corridos a la
  izquierda en vez de centrados debajo del título (`.est-hero-btns`
  tenía `justify-content:flex-start`).

  Motivo: fix visual — no había razón funcional para el desalineo, era
  una regla de CSS mal seteada.
v0.14
### Agregado
- **Modo "swipe" en mobile, con paginación de a 4 en cuadrícula
  (especialidades, medicina estética, depilación):** el botón "Ver
  más" de la fila swipe pasó a "Ver en cuadrícula"; una vez en
  cuadrícula, cada tap suma 4 resultados más y solo ofrece "Ver menos"
  cuando ya no queda nada por mostrar (antes de esto, entrar a
  cuadrícula mostraba todos los resultados de una sola vez).

  Motivo: mostrar de a poco es más manejable que tirar el catálogo
  completo apenas se sale del modo swipe, sobre todo en depilación
  (57 zonas).

- **`pages/tratamiento-depilacion-definitiva.html` — el mapa de
  cuerpo se oculta por debajo de 990px** (antes solo se apilaba arriba
  del buscador a partir de 860px, pero seguía presente en mobile). Los
  chips de filtro por zona cubren el mismo filtro sin necesitar el
  SVG, que en una pantalla angosta queda demasiado chico para tocar
  con precisión.

- **20 fichas `pages/blog-<slug>.html` + sección "Blog & tips" en
  `pages/nosotros.html`:** el contenido de la ex `pages/blog.html`
  (que había quedado aislada — ningún link del sitio apuntaba a
  ella) se movió a una sección dentro de "Nosotros" (mismo diseño y
  clases `blog2-*`/`js/blog.js` de origen, con filtros por categoría),
  y cada uno de los 20 tips sumó su propia ficha individual con
  título/meta description/JSON-LD `Article` propios, con un carrusel
  de "Otros tips de [categoría]" al pie. `pages/blog.html` se borró.

  Motivo: indexabilidad — los 20 tips no tenían URL ni título propios
  (vivían solo como texto dentro de una página que además nadie
  enlazaba), y de paso se resolvió que "Blog" quedara sin ningún punto
  de entrada real en el sitio.

- **SEO — `pages/nosotros.html`:** meta description (no tenía
  ninguna) y JSON-LD `AboutPage` con un `MedicalClinic` anidado (mismo
  dato de la organización que ya usa `index.html`).
v0.15
### Cambiado
- **`pages/nosotros.html` — eyebrows rotas en "Quiénes somos" y "Blog
  & tips":** la etiqueta tipo píldora (`.eyebrow`) se estiraba a todo
  el ancho de su columna en vez de ajustarse al texto, porque
  `.nos2-quienes-label{display:flex;flex-direction:column}` estira a
  sus hijos por default (`align-items:stretch`). Se sacó la eyebrow y
  la línea vertical de esas dos secciones (queda solo la del hero) y
  el título+texto pasaron a un bloque centrado simple, sin la grilla
  de dos columnas que las contenía.

- **Sección "Blog & tips" — rediseño:** se sacó el bloque separado
  "Más consultado por nuestras pacientes" (con su propio título y
  estilo de card distinto) y los 5 bloques por categoría (uno debajo
  del otro). Ahora los filtros van pegados debajo del texto de
  intro, y debajo de los filtros hay una única fila de cards
  (`.carousel`/`.car-track`, se recorre con los botones ‹› o
  arrastrando el dedo) armada por `js/blog.js` a partir de
  `js/blog-data.js`: "Todos" muestra los tips más consultados (antes
  eran cards con otro estilo aparte; ahora son las mismas cards que
  el resto, sin título de sección) y cada categoría arma su propia
  fila.

  Motivo: pedido explícito de simplificar la sección a "filtros +
  una sola fila de cards" en vez de una página de blog completa
  embebida con múltiples bloques.

- **Botón "Solicitar turno" de las cards del blog:** tenía la clase
  `btn-outline`, que no está definida en ningún `.css` del sitio —
  salía como texto plano sin ningún estilo de botón. Ahora es una
  píldora sólida magenta con hover.

- **Carrusel del blog — mobile y overlap de flechas:** por debajo de
  768px las cards se achican (78vw, tope 260px, tipografía más chica)
  y las flechas ‹› se ocultan por completo en dispositivos táctiles
  (`hover:none` + `pointer:coarse`, ya que el track se recorre
  arrastrando el dedo). Además, en desktop, las flechas quedaban
  superpuestas sobre la primera/última card en resoluciones de
  notebook comunes (1280-1366px): estaban ancladas por fuera del
  `.carousel` (`left/right:-14px`) confiando en que sobrara margen
  afuera del `.wrap` (tope 1180px), margen que a esos anchos no
  alcanzaba. Se le agregó padding lateral propio al `.wrap` de esta
  sección (`.nos2-blog-catalog`, 80px en vez de los 24px de base) y
  las flechas ahora flotan dentro de ese padding (`-56px`), sin
  depender del margen externo del `.wrap`.