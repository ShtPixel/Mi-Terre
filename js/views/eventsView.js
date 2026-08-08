import { createProximosBanner } from '../components/proximosBanner.js';
import { createCalendarWidget } from '../components/calendarWidget.js';
import { getProximosEvents, getAllEvents } from '../store/eventsStore.js';
import { createEventCard } from '../components/eventCard.js';

export async function renderEventsView() {
  const container = document.createElement('div');
  container.className = 'events-page-view';

  // Encabezado principal de pagina Eventos
  const header = document.createElement('div');
  header.className = 'page-header';
  header.style.marginBottom = '1.5rem';
  header.innerHTML = `
    <div class="hero">
      <h1>Eventos Comunitarios</h1>
      <p>
        Exlora los eventos próximos, consulta en el calendario o busca en el listado completo de eventos. ¡No te pierdas nada!
      </p>
    </div>
  `;
  container.appendChild(header);

  // SUBSECCIÓN: Banner de Próximos Eventos
  const proximosBanner = createProximosBanner(3);
  container.appendChild(proximosBanner);

  // SUBSECCIÓN: Calendario de Eventos
  const calendarWidget = createCalendarWidget();
  container.appendChild(calendarWidget);

  // SUBSECCIÓN: Listado completo de eventos

  return container;
}