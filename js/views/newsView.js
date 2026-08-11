import { createFilterView } from '../components/filterView.js';
import { createNewsBanner } from '../components/noticias/newsBanner.js';
import { getAllNews } from '../store/newsStore.js';
import { createNewsCard } from '../components/noticias/newsCard.js';

export async function renderNewsView() {
    const container = document.createElement('div');
    container.className = 'news-page-view';

    // Encabezado principal de la página de Noticias
    const header = document.createElement('div');
    header.className = 'page-header';
    header.style.marginBottom = '1.5rem';
    header.innerHTML = `
        <div class="hero">
            <h1>Noticias de la Comunidad</h1>
            <p>
                Mantente informado con las últimas noticias, anuncios y actualizaciones de nuestra comunidad.
            </p>
        </div>
    `;
    container.appendChild(header);


    // Inyectar el banner pidiendo, por ejemplo, las 6 noticias más recientes (dará 2 páginas de 3 cards)
    const newsBanner = createNewsBanner(6);
    container.appendChild(newsBanner);

     // SUBSECCIÓN: Listado completo de noticias y filtro
    const todosNewsData = getAllNews();

    const categories = [...new Set (todosNewsData.map(e => e.categoria))];
    const locations = [...new Set (todosNewsData.map(e => e.lugar))];

    const todosSection = document.createElement('section');
      todosSection.className = 'filter-view-component';
      todosSection.innerHTML = `
        <h2 class="banner-title">Listado Completo de Noticias</h2>
      `;
    
      // Instancia de FilterView para el listado completo de noticias
      const filterView = createFilterView({
        items: todosNewsData,
        renderItemFn: createNewsCard, //Función que renderiza cada noticia en tarjeta
        categories: categories,
        locations: locations,
        placeholderSearch: 'Buscar noticias...'
      });
    
      todosSection.appendChild(filterView);
      container.appendChild(todosSection);
    

    return container;
}