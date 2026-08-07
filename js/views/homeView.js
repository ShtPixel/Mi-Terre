export async function renderHomeView() {
  const container = document.createElement('section');
  container.className = 'home-view';

  container.innerHTML = `
    <div class="hero">
      <h1>Bienvenido a la Comunidad</h1>
      <p>Conecta con eventos locales, talleres y actividades de tu zona.</p>
    </div>
    
    <div class="upcoming-section">
      <h2>Próximos Eventos</h2>
      <div id="home-events-container" class="events-grid">
        <p>Cargando eventos próximos...</p>
      </div>
    </div>
  `;

  return container;
}