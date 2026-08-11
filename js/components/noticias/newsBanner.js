// js/components/newsBanner.js
import { getRecentNews } from '../../store/newsStore.js';

import { createNewsCard } from './newsCard.js';

export function createNewsBanner(totalNews = 6) {
  const container = document.createElement('section');
  container.className = 'proximos-banner';

  const newsList = getRecentNews(totalNews);

  container.innerHTML = `
    <!-- 1. TÍTULO ARRIBA -->
    <h2 class="banner-title">Noticias Recientes</h2>

    <!-- 2. FILA DE BOTONES Y CARDS (SÁNDWICH) -->
    <div class="cards-banner-body">
      <button class="banner-btn btn-prev" id="prev-news-btn" aria-label="Anterior">❮</button>
      
      <div class="card-track" id="news-track-container"></div>
      
      <button class="banner-btn btn-next" id="next-news-btn" aria-label="Siguiente">❯</button>
    </div>
  `;

  const track = container.querySelector('#news-track-container');

  if (newsList.length === 0) {
    track.innerHTML = `
    <div class="no-elements-alert">
        <p>No hay noticias disponibles.</p>
    </div>`;
    return container;
  }

  // Inyectar tarjetas
  newsList.forEach(newsItem => {
    track.appendChild(createNewsCard(newsItem));
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