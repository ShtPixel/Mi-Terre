import { createProximosBanner } from '../components/proximosBanner.js';
import { createNewsBanner } from '../components/noticias/newsBanner.js';


export async function renderHomeView() {
  const container = document.createElement('section');
  container.className = 'home-view';

  container.innerHTML = `
    <div class="hero">
      <h1>Bienvenido a la Comunidad</h1>
      <p>Conecta con eventos locales, talleres y actividades de tu zona.</p>
    </div>
  `;

  const proximosBanner = createProximosBanner(3);
  container.appendChild(proximosBanner);

  // Inyectar el banner pidiendo, por ejemplo, las 6 noticias más recientes (dará 2 páginas de 3 cards)
  const newsBanner = createNewsBanner(6);
  container.appendChild(newsBanner);

  return container;
}