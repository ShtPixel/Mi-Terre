import { renderNavbar } from './components/navbar.js';
import { initEventsStore } from './store/eventsStore.js';
import { initNewsStore } from './store/newsStore.js';
import { renderAboutView } from './views/aboutView.js';
import { initRouter } from './router.js';

async function main() {

    // 1. Renderizar estructura global del Navbar
    renderNavbar();
    
    // 2. Cargar e inicializar base de datos de eventos (Store)
    await initEventsStore();

    //3. Cargar e inicializar base de datos de noticias (Store)
    await initNewsStore();

    //4. Cargar e inicializar vista de about
    renderAboutView();

    // 5. Arrancar el Router para manejar el contenido dinámico
    initRouter();

}

main();