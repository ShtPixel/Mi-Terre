import { renderHomeView } from './views/homeView.js';
import { renderEventsView } from './views/eventsView.js';
import { updateActiveNavLink } from './components/navbar.js';
import { renderNewsView } from './views/newsView.js';
import { renderAboutView} from './views/aboutView.js'

// Mapeo de rutas (Hash -> Función creadora de la Vista)
const routes = {
  '#/': renderHomeView,
  '#/eventos': renderEventsView,
  '#/noticias': renderNewsView,
  '#/acerca-de': renderAboutView
};

/**
 * Función principal del Router: Detecta la ruta actual y monta la vista
 */
export async function router() {
  const appContainer = document.getElementById('app-content');
  if (!appContainer) return;

  // Obtener el hash actual de la URL. Si está vacío, por defecto es '#/'
  const currentHash = window.location.hash || '#/';

  // Buscar la vista correspondiente o redirigir a inicio si no existe
  const viewFunction = routes[currentHash] || routes['#/'];

  // Limpiar el contenido anterior del contenedor principal
  appContainer.innerHTML = '';

  // Renderizar la nueva vista e inyectarla en el DOM
  const viewElement = await viewFunction();
  appContainer.appendChild(viewElement);

  // Actualizar el estado del Navbar para resaltar el enlace activo
  updateActiveNavLink(currentHash);
}

/**
 * Inicializa los escuchadores de eventos para la navegación
 */
export function initRouter() {
  // Escuchar cuando la URL cambia (clic en un enlace del navbar)
  window.addEventListener('hashchange', router);

  // Ejecutar el router en la carga inicial de la página
  router();
}