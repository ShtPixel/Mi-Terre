import { isFavorite, toggleFavorite } from '../../store/favorites/favoritesStore.js';

const PATH_OUTLINE = '../../assets/icons/heart-outline.svg';
const PATH_FILLED = '../../assets/icons/heart-bold.svg';



function getIconPath(isActive) {
  return isActive ? PATH_FILLED : PATH_OUTLINE;
}

export function createFavButton(itemId, options = { showLabel: false, customClass: '' }) {
  const btn = document.createElement('button');
  const active = isFavorite(itemId);

  btn.className = `fav-btn ${active ? 'is-active' : ''} ${options.customClass}`.trim();
  btn.setAttribute('aria-label', active ? 'Quitar de favoritos' : 'Guardar en favoritos');
  btn.setAttribute('data-id', itemId);

  btn.innerHTML = `
    <span class="fav-icon" aria-hidden="true">
      <img src="${getIconPath(active)}" alt="" class="fav-icon-img" width="20" height="20" />
    </span>
    ${options.showLabel ? `<span class="fav-label">${active ? 'Guardado' : 'Guardar'}</span>` : ''}
  `;

  const iconImg = btn.querySelector('.fav-icon-img');
  const label = btn.querySelector('.fav-label');

  // Evento Clic
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    const isNowFav = toggleFavorite(itemId);
    
    btn.classList.toggle('is-active', isNowFav);
    if (iconImg) iconImg.src = getIconPath(isNowFav);
    if (label) label.textContent = isNowFav ? 'Guardado' : 'Guardar';

    // Sincronizar otros botones en pantalla
    document.dispatchEvent(new CustomEvent('favoriteStateChanged', {
      detail: { itemId, isFavorite: isNowFav }
    }));
  });

  // Escuchar eventos globales para mantener sincronizados modal y tarjetas
  document.addEventListener('favoriteStateChanged', (e) => {
    if (e.detail.itemId === itemId && e.target !== btn) {
      btn.classList.toggle('is-active', e.detail.isFavorite);
      if (iconImg) iconImg.src = getIconPath(e.detail.isFavorite);
      if (label) label.textContent = e.detail.isFavorite ? 'Guardado' : 'Guardar';
    }
  });

  return btn;
}