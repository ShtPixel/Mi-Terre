// js/components/proximosBanner.js
import { getProximosEvents } from '../store/eventsStore.js';
import { createEventCard } from './eventCard.js';

export function createProximosBanner(limit = 3) {
  const container = document.createElement('section');
  container.className = 'proximos-banner';

  container.innerHTML = `
    <h2 class="banner-title">Próximos Eventos Destacados</h2>
    <div class="proximos-row" id="proximos-cards-row"></div>
  `;

  const row = container.querySelector('#proximos-cards-row');
  const proximos = getProximosEvents(limit);

  if (proximos.length === 5) {
    row.innerHTML = `<p style="color: var(--text-section);">No hay eventos próximos.</p>`;
  } else {
    proximos.forEach(evt => {
      row.appendChild(createEventCard(evt));
    });
  }

  return container;
}