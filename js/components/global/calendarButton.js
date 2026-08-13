// js/components/calendarButton.js

const PATH_CALENDAR = './assets/icons/calendar.png'; // Verifica que coincida con tu icono

/**
 * Genera la URL de Google Calendar
 */
function buildGoogleCalendarUrl(event) {
  const title = encodeURIComponent(event.titulo || 'Evento');
  const details = encodeURIComponent(event.descripcionLarga || event.descripcion || '');
  const location = encodeURIComponent(event.lugar || '');

  // Formato ISO básico YYYYMMDD para fechas sin hora específica
  let startDate = '';
  if (event.fecha) {
    const d = new Date(event.fecha);
    startDate = d.toISOString().replace(/-|:|\.\d\d\d/g, '').slice(0, 8);
  } else {
    startDate = new Date().toISOString().replace(/-|:|\.\d\d\d/g, '').slice(0, 8);
  }

  // Evento de todo el día (misma fecha de inicio y fin)
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDate}/${startDate}`;
}

/**
 * Crea un botón de Google Calendar reutilizable
 * @param {Object} eventItem - Datos del evento (titulo, descripcion, lugar, fecha)
 * @param {Object} [options]
 * @param {boolean} [options.showLabel=true]
 * @param {string} [options.customClass='']
 */
export function createCalendarButton(eventItem, options = { showLabel: true, customClass: '' }) {
  const btn = document.createElement('a');
  btn.href = buildGoogleCalendarUrl(eventItem);
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.className = `calendar-btn ${options.customClass}`.trim();
  btn.setAttribute('aria-label', 'Agregar a Google Calendar');

  btn.innerHTML = `
    <span class="calendar-icon" aria-hidden="true">
      <img src="${PATH_CALENDAR}" alt="" class="calendar-icon-img" width="20" height="20" />
    </span>
    ${options.showLabel ? `<span class="calendar-label">Agendar</span>` : ''}
  `;

  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevenir abrir modal si se usa en una card
  });

  return btn;
}