import { getFavorites } from '../store/favorites/favoritesStore.js';
import { getAllEvents } from '../store/eventsStore.js'; // Revisa las rutas a tus stores
import { getAllNews } from '../store/newsStore.js';
import { createEventCard } from '../components/eventCard.js';
import { createNewsCard } from '../components/noticias/newsCard.js';


export function renderFavoritesView() {
  const container = document.createElement('div');
  container.className = 'favorites-page container';

  const favIds = getFavorites();

  container.innerHTML = `
    <header class="page-header" style="margin-bottom: 2rem;">
      <h1 class="page-title">Mis Favoritos</h1>
      <p class="page-subtitle" style="color: #64748b;">
        Aquí están las noticias y eventos que has guardado para ver más tarde.
      </p>
    </header>
    <div id="favorites-grid" class="cards-grid"></div>
  `;

  const grid = container.querySelector('#favorites-grid');

  function loadFavorites() {
    grid.innerHTML = '';
    const currentFavIds = getFavorites();

    if (currentFavIds.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="text-align: center; padding: 4rem 1rem; grid-column: 1 / -1;">
          <p style="font-size: 3rem; margin-bottom: 1rem;">📑</p>
          <h3>No tienes elementos guardados</h3>
          <p style="color: #64748b; margin-top: 0.5rem;">
            Explora los eventos y noticias y presiona el botón de guardar para verlos aquí.
          </p>
        </div>
      `;
      return;
    }

    // Obtener todos los datos de eventos y noticias
    const allEvents = getAllEvents ? getAllEvents() : [];
    const allNews = getAllNews ? getAllNews() : [];

    // Filtrar los que coinciden con los IDs guardados
    const favEvents = allEvents.filter(e => currentFavIds.includes(e.id));
    const favNews = allNews.filter(n => currentFavIds.includes(n.id));

    // Renderizar tarjetas
    favEvents.forEach(event => {
      grid.appendChild(createEventCard(event));
    });

    favNews.forEach(news => {
      grid.appendChild(createNewsCard(news));
    });
  }

  // Carga inicial
  loadFavorites();

  // Escuchar si se remueve un favorito mientras está en esta página para refrescar la lista en vivo
  document.addEventListener('favoriteStateChanged', () => {
    // Si estamos en la vista de favoritos, recargamos la grilla
    if (document.body.contains(grid)) {
      loadFavorites();
    }
  });

  return container;
}