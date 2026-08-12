/**
 * Crea una tarjeta de noticia usando clases nativas de Bootstrap 5
 * @param {Object} news - Objeto con datos de la noticia
 * @param {number} maxDescLength - Límite de caracteres para la descripción (default: 100)
 *@returns {HTMLElement} 
*/

import { isFavorite, toggleFavorite } from '../../store/favorites/favoritesStore.js';
import { openDetailModal } from '../global/detailModal.js';
import { createFavButton } from '../global/favButton.js';

export function createNewsCard(news, maxDescLength = 90) {
  const card = document.createElement('article');
  card.className = 'event-card';

  const fechaObj = new Date(news.fecha);
  const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short'
  });

  // Lógica de recortar texto si supera el límite
  const descCorta = (news.descripcion && news.descripcion.length > maxDescLength)
    ? `${news.descripcion.substring(0, maxDescLength)}...`
    : news.descripcion;

  const favActivo = isFavorite(news.id);

  card.innerHTML = `
    <div class="card-image-container">
      <span class="event-badge">${news.categoria || 'General'}</span>
      <img src="${news.imagen}" alt="${news.titulo}" class="event-card-image" loading="lazy">
    </div>
    <div class="event-card-body">

      <h3 class="nevent-title">${news.titulo}</h3>
      <p class="event-description">${descCorta}</p>

      <div class="event-meta">

        <div class= "event-meta-item">
          <span style="color: var(--text-muted);">${fechaFormateada}</span>
        </div>

        <div class= "event-meta-item">
          <span style="color: var(--text-muted);">${fechaFormateada}</span>
        </div>
        
        <div class="event-meta-item">
          <span style="color: var(--text-muted);">${news.lugar}</span>
        </div>

        <div class="event-meta-item">
        <button class="read-more-btn" data-id="${news.id}">Leer Más</button>
        <div class="fav-btn-container"></div>
        </div>
      </div>
    </div>
  `;


  // 1. Evento para abrir el modal con el detalle


  const readMoreBtn = card.querySelector('.read-more-btn');
  readMoreBtn.addEventListener('click', () => {
    openDetailModal(news);
  });
 
  // 2. Botón de favorito
  const actionsContainer = card.querySelector('.fav-btn-container');
  const favBtn = createFavButton(news.id, { showLabel: true });
  actionsContainer.appendChild(favBtn);

  return card;
}