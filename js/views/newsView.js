import { createFilterView } from '../components/filterView.js';


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

    return container;
}