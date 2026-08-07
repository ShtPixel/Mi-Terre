// js/app.js
import { renderNavbar } from './components/navbar.js';
import { initRouter } from './router.js';

// 1. Renderizar estructura global del Navbar
renderNavbar();

// 2. Arrancar el Router para manejar el contenido dinámico
initRouter();