import { createProximosBanner } from '../components/proximosBanner.js';


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

  return container;
}