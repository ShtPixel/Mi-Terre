import { createProximosBanner } from '../components/proximosBanner.js';
import { createCalendarWidget } from '../components/calendarWidget.js';
import { createFilterView } from '../components/filterView.js';
import { getAllEvents } from '../store/eventsStore.js';
import { createEventCard } from '../components/eventCard.js';
import { createInteractiveMap } from '../components/global/interactiveMap.js';


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

  // SUBSECCIÓN: Listado completo de eventos y filtro
  const todosEventsData = getAllEvents();

  //Obtener tipo y lugar sin duplicar?
  const categories = [...new Set (todosEventsData.map(e => e.categoria))];
  const locations = [...new Set (todosEventsData.map(e => e.lugar))];

  const todosSection = document.createElement('section');
  todosSection.className = 'filter-view-component';
  todosSection.innerHTML = `
    <h2 class="banner-title">Listado Completo de Eventos</h2>
  `;

  // Mapa interactivo
  const mapElement = createInteractiveMap(todosEventsData);
  container.appendChild(mapElement); // Se coloca arriba de los eventos

  // Instancia de FilterView para el listado completo de eventos
  const filterView = createFilterView({
    items: todosEventsData,
    renderItemFn: createEventCard, //Función que renderiza cada evento en tarjeta
    categories: categories,
    locations: locations,
    placeholderSearch: 'Buscar eventos...'
  });

  todosSection.appendChild(filterView);
  container.appendChild(todosSection);


  return container;
}