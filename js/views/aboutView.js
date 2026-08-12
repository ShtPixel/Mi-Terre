export async function renderAboutView() {
    const container = document.createElement ('div');
    container.className = 'about-page-view';

    //Seccion con informacion acerca de la pagina y el proyecto
    const section = document.createElement('section');
    section.className = 'page-information';
    section.innerHTML= `
    <div class="hero">
      <h1>Mi Terre</h1>
      <p>
        Aquí encontraras información relevante acerca de este proyecto y de toda la itención que tiene el mismo, junto con información
        de su desarrollador.
      </p>
    </div>

    <div class="info-section">
      <h2 class = "banner-title">Acerca de Mi Terre</h2>
      <p>
        La plataforma tiene como objetivo principal facilitar el acceso a la información comunitaria, promoviendo la transparencia, la 
        participación ciudadana y el fortalecimiento del tejido social en Gran Mallama. A través de este sistema, la comunidad puede 
        estar al día con las noticias locales, conocer los próximos eventos, explorar la riqueza cultural de la región y establecer 
        canales de comunicación efectivos con las autoridades locales.
      </p>
    </div>

    <div class="info-section">
      <h2 class = "banner-title">Politica de Privacidad</h2>
      <p>
        La información personal de los usuarios se utiliza únicamente para fines comunicativos y organizativos de la comunidad, siguiendo las mejores prácticas de protección de datos.
      </p>
    </div>

    <div class="info-section">
      <h2 class = "banner-title">Desarrollador</h2>
      <p>
        El desarrollador de esta pagina es muy inteligente y muy guapo jiji, y tu eres un tonto.
      </p>
    </div>

    `;
    container.appendChild(section);

    return container;
    
}