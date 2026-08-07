/**
 * Renderiza el elemento Navbar en el DOM
 */
export function renderNavbar() {
  const container = document.getElementById('navbar-container');

  container.innerHTML = `
    <nav class="navbar">
      <div class="navbar-inner">
        <a href="#/" class="logo">
          <span>🌐</span> Mi Terre
        </a>
        <ul class="nav-links">
          <li><a href="#/" class="nav-link" id="nav-home">Inicio</a></li>
          <li><a href="#/eventos" class="nav-link" id="nav-events">Eventos</a></li>
        </ul>
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