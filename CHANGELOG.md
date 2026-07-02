# Changelog — CGAP Web

Registro de cambios y motivos, para trazabilidad del proceso de optimización.

## [Sin publicar]
16:42 2/7/2026
### Cambiado
- **Estructura de assets (CSS/JS):** se dividieron `styles.css` y 
  `app.js` monolíticos en archivos separados por página/uso, 
  organizados en `styles/` y `js/`.
  
  Motivo: todas las páginas cargaban el CSS/JS completo del sitio 
  aunque solo usaran una fracción, generando peso de carga 
  innecesario. Ahora cada página solo importa lo que necesita.
  
  Impacto esperado: mejora en tiempos de carga y Core Web Vitals 
  (especialmente LCP), con beneficio indirecto en SEO.

17:42 2/7/2026
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
