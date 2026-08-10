// js/components/proximosBanner.js
import { getProximosEvents } from '../store/eventsStore.js';
import { createEventCard } from './eventCard.js';

export function createProximosBanner(limit = 3) {
  const container = document.createElement('section');
  container.className = 'proximos-banner';

  container.innerHTML = `
    <h2 class="banner-title">Próximos Eventos</h2>
    <div class="proximos-row" id="proximos-cards-row"></div>
  `;

  const row = container.querySelector('#proximos-cards-row');
  const proximos = getProximosEvents(limit);

  if (proximos.length === 0) {
    row.innerHTML = `
    <div class="no-elements-alert">
        <p>No hay eventos próximos.</p>
    </div>`;
  } else {
    proximos.forEach(evt => {
      row.appendChild(createEventCard(evt));
    });
  }

  return container;
}