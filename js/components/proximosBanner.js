// js/components/proximosBanner.js
import { getProximosEvents } from '../store/eventsStore.js';

import { createEventCard } from './eventCard.js';

export function createProximosBanner(totalEvents = 6) {
  const container = document.createElement('section');
  container.className = 'proximos-banner';

  const eventsList = getProximosEvents(totalEvents);

  container.innerHTML = `
    <!-- 1. TÍTULO ARRIBA -->
    <h2 class="banner-title">Eventos Recientes</h2>

    <!-- 2. FILA DE BOTONES Y CARDS (SÁNDWICH) -->
    <div class="cards-banner-body">
      <button class="banner-btn btn-prev" id="prev-news-btn" aria-label="Anterior">❮</button>
      
      <div class="card-track" id="news-track-container"></div>
      
      <button class="banner-btn btn-next" id="next-news-btn" aria-label="Siguiente">❯</button>
    </div>
  `;

  const track = container.querySelector('#news-track-container');

  if (eventsList.length === 0) {
    track.innerHTML = `
    <div class="no-elements-alert">
        <p>No hay eventos disponibles.</p>
    </div>`;
    return container;
  }

  // Inyectar tarjetas
  eventsList.forEach(eventItem => {
    track.appendChild(createEventCard(eventItem));
  });

  // Eventos de desplazamiento
  const prevBtn = container.querySelector('#prev-news-btn');
  const nextBtn = container.querySelector('#next-news-btn');

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
  });

  return container;
}