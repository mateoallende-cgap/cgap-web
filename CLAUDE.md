# CGAP · Sitio web

Sitio del **Centro Ginecológico Allende Pinto (CGAP)** — centro integral para la salud de la mujer en Córdoba, Argentina.

## Identidad de marca
- **Color principal:** `#AD1E77` (magenta). Definido como `--magenta` en `styles/base/variables.css`.
- **Tipografías:** Fraunces (títulos) + Mulish (texto). Se cargan desde Google Fonts.
- El nombre del centro es siempre **CGAP** (nunca "SEGAP").
- Logo: `assets/cgap-logo.png` (color, para fondos claros) y `assets/cgap-logo-white.png` (blanco, para el footer oscuro). En la práctica el logo se embebe como `data:` URI directo en el HTML del navbar/footer de cada página; estos PNG quedan como archivo de referencia.

## Estructura
Sitio estático, sin build ni dependencias.
- `index.html` — Home (hero, prestaciones, especialistas, novedades, contacto). Es la única página en la raíz.
- `pages/` — el resto de las páginas, todas un nivel abajo de la raíz (por eso sus rutas a `styles/`, `js/`, `data.js` y `assets/` llevan `../`):
  - `nosotros.html` — rediseño `nos2-*`.
  - `practicas.html` — Catálogo de prácticas (`prac2-*`) con filtros, catálogo dinámico y modal de detalle.
  - `profesionales.html` — Listado de profesionales con buscador y filtros.
  - `medicina-estetica.html` — hero + tratamientos alternados + listado (`est-*`) y secciones `est2-*`.
  - `circuito.html` — rediseño `circ2-*`.
  - `blog.html` — rediseño `blog2-*`.
- `styles/` — sistema de diseño, dividido así:
  - `styles/base/` — un archivo por pieza compartida entre páginas: `variables.css` (vars de marca, reset, tipografía, `.wrap`, `.sec-head`, `.eyebrow`, `.reveal`), `buttons.css`, `navbar.css`, `footer.css`, `wa-float.css`, `ticker.css`, `doc-card.css`, `page-banner.css`, `search-box.css`, `filtros.css`, `modal.css`.
  - `styles/{pagina}.css` — estilos exclusivos de cada página (`index.css`, `practicas.css`, `profesionales.css`, `nosotros.css`, `medicina-estetica.css`, `circuito.css`, `blog.css`).
  - `styles/responsive/` — media queries: `base.css` (navbar mobile + footer, compartido) y un archivo por página que lo necesita.
  - Cada HTML carga varios `<link rel="stylesheet">` (base/ que usa + su hoja de página + responsive), en ese orden.
- `js/` — lógica del sitio, dividida igual que `styles/` (cada página carga solo lo que usa):
  - `js/global.js` — menú mobile + animación `.reveal`. Se carga en las 7 páginas.
  - `js/index.js` — carrusel de especialistas/novedades, render de destacados, FAQ, hero slider. Solo home (incluye su propio helper `iniciales`).
  - `js/practicas.js` — filtros, catálogo y modal de detalle. Incluye su propio helper `norm` y el handler de los "hint tags" del buscador (hoy inerte: la sección de buscador se quitó del HTML pero el listener sigue definido). Solo `pages/practicas.html`.
  - `js/profesionales.js` — buscador y filtros. Incluye sus propios helpers `iniciales`/`norm`. Solo `pages/profesionales.html`.
  - `js/medicina-estetica.js` — rotación del texto del hero. Solo `pages/medicina-estetica.html`.
  - `js/blog.js` — filtro de tips por categoría. Solo `pages/blog.html`.
  - `nosotros.html` y `circuito.html` solo cargan `js/global.js` (no tienen lógica propia).
- `data.js` — Datos reales: `window.PROFESIONALES` (57) y `window.PRACTICAS` (63). Se carga antes que los scripts de página en las páginas que lo necesitan (home, prácticas, profesionales).
- `assets/` — Logos e imágenes de contenido (fotos de tratamientos, fondo institucional, etc).

## Nota conocida
- `pages/practicas.html` no tiene actualmente el input de búsqueda en el HTML (se quitó del diseño), pero `js/practicas.js` sigue haciendo `document.getElementById("pracBuscar")` sin chequeo de null antes de `addEventListener`. Si en algún momento el elemento vuelve a faltar del todo (hoy tampoco existe), esa línea corta la ejecución del resto del script — ya pasó antes y se identificó como bug preexistente, no introducido por esta reorganización.

## Datos
- Para agregar/editar profesionales o prácticas, modificar `data.js`.
- Cada profesional: `nombre, apellido, especialidad (slug), especialidadTexto, horario, destacado`.
- Cada práctica: `nombre, descripcion, especialidad, tipo, masBuscada, preparacion, orden, duracion`.
- Los marcados como `destacado: true` / `masBuscada: true` aparecen primero (en home y en los listados sin filtro).

## Pendientes / placeholders
- **Nosotros:** reemplazar reseña, misión y valores reales (marcados con `[editar]` y badge "Texto de ejemplo").
- **Medicina estética:** reemplazar las tarjetas de tratamiento por los servicios reales del centro.
- **Formulario de contacto:** hoy envía a `formsubmit.co/zalazarmisael7@gmail.com` (en `index.html`). Cambiar por el mail de CGAP si corresponde.
- **Fotos de profesionales:** hoy se muestran las iniciales. Para usar fotos reales, agregar un campo `foto` en `data.js` y ajustar el render en `app.js`.

## Enlaces clave
- Portal de pacientes (botón nav + tarjetas del home): `https://pacientes.cgap.com.ar/Login`
- WhatsApp turnos: `https://wa.me/5493515079642`

## Cómo ver el sitio
Abrir `index.html` en el navegador (doble clic). No requiere servidor.

## Cómo publicarlo
Arrastrar la carpeta completa a Netlify Drop (https://app.netlify.com/drop), o subirla a Vercel / Cloudflare Pages. Queda con URL permanente, sin túnel.
