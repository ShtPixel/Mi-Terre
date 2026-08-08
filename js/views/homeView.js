import { getProximosEvents } from '../store/eventsStore.js';
import { createEventCard } from '../components/eventCard.js';

export async function renderHomeView() {
  const container = document.createElement('section');
  container.className = 'home-view';

  container.innerHTML = `
    <div class="hero">
      <h1>Bienvenido a la Comunidad</h1>
      <p>Conecta con eventos locales, talleres y actividades de tu zona.</p>
    </div>
    
    <div class="upcoming-section">
      <h2>Próximos Eventos Destacados</h2>
      <div id="home-events-container" class="events-grid"></div>
    </div>
  `;

  // Obtener los datos de los 3 eventos más cercanos
  const eventsContainer = container.querySelector('#home-events-container');
  const proximos = getProximosEvents(3);

  if (proximos.length === 0) {
    eventsContainer.innerHTML = `<p class="no-events">No hay eventos próximos programados.</p>`;
  } else {
    // Inyectar reutilizando el componente eventCard
    proximos.forEach(evento => {
      const cardNode = createEventCard(evento);
      eventsContainer.appendChild(cardNode);
    });
  }

  return container;
}