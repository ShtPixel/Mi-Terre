import { isFavorite, toggleFavorite } from '../../store/favorites/favoritesStore.js';

/**
 * Crea un botón de favorito reutilizable y desemparejado
 * @param {string|number} itemId - ID único del elemento (noticia o evento)
 * @param {Object} options - Opciones de personalización
 * @param {boolean} options.showLabel - Si muestra texto junto al icono (ej: "Guardar")
 * @param {string} options.customClass - Clases CSS extra si se requiere
 */
export function createFavButton(itemId, options = { showLabel: false, customClass: '' }) {
  const btn = document.createElement('button');
  const active = isFavorite(itemId);

  btn.className = `fav-btn ${active ? 'is-active' : ''} ${options.customClass}`.trim();
  btn.setAttribute('aria-label', active ? 'Quitar de favoritos' : 'Guardar en favoritos');
  btn.setAttribute('data-id', itemId);

  // Renderizar la estructura interna con espacio para ICONO + TEXTO opcional
  btn.innerHTML = `
    <span class="fav-icon" aria-hidden="true">
      <!-- AQUÍ PUEDES METER TU SVG O CLASE DE ICONO (Ej: <i class="icon-heart"></i>) -->
      ${renderHeartIcon(active)}
    </span>
    ${options.showLabel ? `<span class="fav-label">${active ? 'Guardado' : 'Guardar'}</span>` : ''}
  `;

  // Manejador de evento independiente
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar que abra el modal si está dentro de una card
    
    const isNowFav = toggleFavorite(itemId);
    
    // Actualizar estado visual local
    btn.classList.toggle('is-active', isNowFav);
    btn.setAttribute('aria-label', isNowFav ? 'Quitar de favoritos' : 'Guardar en favoritos');
    
    const iconContainer = btn.querySelector('.fav-icon');
    if (iconContainer) iconContainer.innerHTML = renderHeartIcon(isNowFav);

    const label = btn.querySelector('.fav-label');
    if (label) label.textContent = isNowFav ? 'Guardado' : 'Guardar';

    // Disparar evento global para sincronizar otros botones del mismo ID si existen
    document.dispatchEvent(new CustomEvent('favoriteStateChanged', {
      detail: { itemId, isFavorite: isNowFav }
    }));
  });

  // Escuchar si el estado cambió desde otro botón en pantalla para estar sincronizados
  document.addEventListener('favoriteStateChanged', (e) => {
    if (e.detail.itemId === itemId && e.target !== btn) {
      btn.classList.toggle('is-active', e.detail.isFavorite);
      const iconContainer = btn.querySelector('.fav-icon');
      if (iconContainer) iconContainer.innerHTML = renderHeartIcon(e.detail.isFavorite);
      
      const label = btn.querySelector('.fav-label');
      if (label) label.textContent = e.detail.isFavorite ? 'Guardado' : 'Guardar';
    }
  });

  return btn;
}

/**
 * Plantilla para el icono SVG (puedes reemplazar esto por tus propios SVGs o fuentes de iconos)
 */
function renderHeartIcon(isActive) {
  return `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="${isActive ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  `;
}