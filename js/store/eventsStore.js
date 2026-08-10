let eventsData = [];

/**
 * Carga los eventos desde el JSON y purga los eventos vencidos
 */
export async function initEventsStore() {
  try {
    const response = await fetch('./data/events.json');
    if (!response.ok) throw new Error('No se pudo cargar la base de datos de eventos.');

    const rawEvents = await response.json();
    const now = new Date();

    // REGLA DE PURGA: Filtrar solo los eventos cuya fecha sea mayor o igual a AHORA
    eventsData = rawEvents
      .filter(event => new Date(event.fecha) >= now)
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  } catch (error) {
    console.error('Error en EventsStore:', error);
    eventsData = [];
  }
}

/**
 * Retorna los próximos 'limit' eventos (útil para la página de Inicio)
 */
export function getProximosEvents(limit = 3) {
  return eventsData.slice(0, limit);
}

/**
 * Retorna la totalidad de eventos vigentes (para el listado completo)
 */
export function getAllEvents() {
  return [...eventsData];
}