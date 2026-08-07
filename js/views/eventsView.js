export async function renderEventsView() {
  const container = document.createElement('section');
  container.className = 'events-view';

  container.innerHTML = `
    <h2>Sección de Eventos</h2>
    <p>Explora todos los eventos comunitarios en nuestras 3 subsecciones.</p>
    
    <!-- Pestañas internas (Tabs) -->
    <div class="tabs-nav">
      <button class="tab-btn active" data-tab="proximos">Próximos Eventos</button>
      <button class="tab-btn" data-tab="calendario">Calendario</button>
      <button class="tab-btn" data-tab="todos">Todos los Eventos</button>
    </div>

    <!-- Contenedor dinámico del Tab activo -->
    <div id="tab-content" class="tab-content">
      <p>Selecciona una pestaña arriba.</p>
    </div>
  `;

  return container;
}