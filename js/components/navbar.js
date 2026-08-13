/**
 * Renderiza el elemento Navbar en el DOM
 */
export function renderNavbar() {
  const container = document.getElementById('navbar-container');

  container.innerHTML = `
    <nav class="navbar navbar-expand-lg sticky-top border-bottom navbar-dark" style="background-color: var(--surface-hover);">
    <div class="container">
      <a href="#/" class="navbar-brand fw-bold text-white d-flex align-items-center gap-2">
        <span>Mi Terre</span>
      </a>

      <button
        class="navbar-toggler border-white"
        type="button"
        
        data-bs-toggle="collapse"
        data-bs-target="#mainNavbar"
        aria-controls="mainNavbar"
        aria-expanded="false"
        aria-label="Abrir navegación"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNavbar">
        <ul class="navbar-nav ms-auto gap-lg-2">
          <li class="nav-item">
            <a href="#/" class="nav-link text-white px-3 rounded" id="nav-home">Inicio</a>
          </li>
          <li class="nav-item">
            <a href="#/eventos" class="nav-link text-white px-3 rounded" id="nav-events">Eventos</a>
          </li>
          <li class="nav-item">
            <a href="#/noticias" class="nav-link text-white px-3 rounded" id="nav-news">Noticias</a>
          </li>
          <li class="nav-item">
            <a href="#/favoritos" class="nav-link text-white px-3 rounded" id="nav-news">Favoritos</a>
          </li>
          <li class="nav-item">
            <a href="#/acerca-de" class="nav-link text-white px-3 rounded" id="nav-news">Acerca De</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `;
}

/**
 * Resalta la pestaña activa comparando el hash actual con las rutas
 * @param {string} currentHash - Ejemplo: '#/' o '#/eventos'
 */
export function updateActiveNavLink(currentHash) {
  const homeLink = document.getElementById('nav-home');
  const eventsLink = document.getElementById('nav-events');

  if (!homeLink || !eventsLink) return;

  // Limpiar clases activas
  homeLink.classList.remove('active');
  eventsLink.classList.remove('active');

  // Asignar clase activa según el hash
  if (currentHash === '#/eventos') {
    eventsLink.classList.add('active');
  } else {
    // Por defecto (#/ o cualquier otra ruta inicial)
    homeLink.classList.add('active');
  }
}