/**
 * Crea una vista de filtrado y búsqueda reutilizable.
 * @param {Object} config 
 * @param {Array} config.items - Lista original de objetos (Eventos, Noticias, etc.)
 * @param {Function} config.renderItemFn - Función que recibe un item y retorna un Nodo DOM (ej: createEventCard)
 * @param {Array} config.categories - Lista de categorías para el filtro select
 * @param {Array} config.locations - Lista de lugares/ubicaciones para el filtro select
 * @param {string} config.placeholderSearch - Placeholder para el input de texto
 */
export function createFilterView({
  items = [],
  renderItemFn,
  categories = [],
  locations = [],
  placeholderSearch = 'Buscar...'
}) {
  const container = document.createElement('div');
  container.className = 'filter-view-component';

  // Opciones dinámicas para el select de Categoría
  const categoryOptions = categories
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join('');

  // Opciones dinámicas para el select de Lugar
  const locationOptions = locations
    .map(loc => `<option value="${loc}">${loc}</option>`)
    .join('');

  container.innerHTML = `
    <!-- BARRA DE FILTROS -->
    <div class="filters-bar">

      <!-- Filtro por Categoría / Tipo -->
      <div class="filter-group">
        <select id="filter-category-select" class="filter-select">
          <option value="">Todas las categorías</option>
          ${categoryOptions}
        </select>
      </div>

      <!-- Filtro por Lugar / Ubicación -->
      <div class="filter-group">
        <select id="filter-location-select" class="filter-select">
          <option value="">Todos los lugares</option>
          ${locationOptions}
        </select>
      </div>

      <!-- Filtro por Fecha -->
      <div class="filter-group">
        <input 
          type="date" 
          id="filter-date-input" 
          class="filter-input"
        >
      </div>

      <!-- Input de búsqueda por texto -->
      <div class="filter-group search-group">
        <input 
          type="text" 
          id="filter-search-input" 
          class="filter-input" 
          placeholder="${placeholderSearch}"
        >
      </div>

      <!-- Botón para Limpiar Filtros -->
      <button id="reset-filters-btn" class="reset-btn" title="Limpiar filtros">🔄 Limpiar</button>
    </div>

    <!-- GRILLA DONDE SE RENDERIZAN LAS TARJETAS -->
    <div id="filter-results-grid" class="events-grid"></div>
  `;

  const categorySelect = container.querySelector('#filter-category-select');
  const locationSelect = container.querySelector('#filter-location-select');
  const dateInput = container.querySelector('#filter-date-input');
  const searchInput = container.querySelector('#filter-search-input');
  const resetBtn = container.querySelector('#reset-filters-btn');
  const resultsGrid = container.querySelector('#filter-results-grid');

  // LÓGICA DE FILTRADO MULTI-CRITERIO
  function applyFilters() {
    const selectedCategory = categorySelect.value;
    const selectedLocation = locationSelect.value;
    const selectedDate = dateInput.value; // Formato YYYY-MM-DD
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredItems = items.filter(item => {
      // 4. Coincidencia de texto (en título o descripción)
      const matchesText = !searchText || 
        (item.titulo && item.titulo.toLowerCase().includes(searchText)) ||
        (item.descripcion && item.descripcion.toLowerCase().includes(searchText));

      // 1. Coincidencia de Categoría
      const matchesCategory = !selectedCategory || item.categoria === selectedCategory;

      // 2. Coincidencia de Lugar
      const matchesLocation = !selectedLocation || item.lugar === selectedLocation;

      // 3. Coincidencia de Fecha
      const matchesDate = !selectedDate || (item.fecha && item.fecha.startsWith(selectedDate));

      return matchesText && matchesCategory && matchesLocation && matchesDate;
    });

    renderGrid(filteredItems);
  }

  // RENDERIZADO DE RESULTADOS
  function renderGrid(dataList) {
    resultsGrid.innerHTML = '';

    if (dataList.length === 0) {
      resultsGrid.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
          <p>No se encontraron resultados que coincidan con los filtros seleccionados.</p>
        </div>
      `;
      return;
    }

    dataList.forEach(item => {
      const cardNode = renderItemFn(item);
      resultsGrid.appendChild(cardNode);
    });
  }

  // EVENT LISTENERS DE REACCIÓN INMEDIATA
  searchInput.addEventListener('input', applyFilters);
  categorySelect.addEventListener('change', applyFilters);
  locationSelect.addEventListener('change', applyFilters);
  dateInput.addEventListener('change', applyFilters);

  resetBtn.addEventListener('click', () => {
    categorySelect.value = '';
    locationSelect.value = '';
    dateInput.value = '';
    searchInput.value = '';
    applyFilters();
  });

  // Render inicial con todos los items
  renderGrid(items);

  return container;
}