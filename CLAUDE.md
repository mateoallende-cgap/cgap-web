# CGAP · Sitio web

Sitio del **Centro Ginecológico Allende Pinto (CGAP)** — centro integral para la salud de la mujer en Córdoba, Argentina.

## Identidad de marca
- **Color principal:** `#AD1E77` (magenta). Definido como `--magenta` en `styles.css`.
- **Tipografías:** Fraunces (títulos) + Mulish (texto). Se cargan desde Google Fonts.
- El nombre del centro es siempre **CGAP** (nunca "SEGAP").
- Logo: `assets/cgap-logo.png` (color, para fondos claros) y `assets/cgap-logo-white.png` (blanco, para el footer oscuro).

## Estructura
Sitio estático, sin build ni dependencias. Estructura plana:
- `index.html` — Home (hero, prestaciones, especialistas, novedades, contacto).
- `nosotros.html` — **Contenido de ejemplo (placeholder), pendiente de reemplazar.**
- `practicas.html` — Catálogo de prácticas con buscador, filtros y modal de detalle.
- `profesionales.html` — Listado de profesionales con buscador y filtros.
- `medicina-estetica.html` — **Tratamientos de ejemplo (placeholder), pendientes de reemplazar.**
- `styles.css` — Sistema de diseño compartido (todos los estilos).
- `app.js` — Lógica compartida: menú mobile, animaciones, carruseles, buscadores/filtros.
- `data.js` — Datos reales: `window.PROFESIONALES` (57) y `window.PRACTICAS` (63).
- `assets/` — Logos.

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
