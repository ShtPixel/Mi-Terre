export function createNewsCard(news, maxDescLength = 90) {
  const card = document.createElement('article');
  card.className = 'news-card';

  const fechaObj = new Date(news.fecha);
  const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short'
  });

  // Lógica de recortar texto si supera el límite
  const descCorta = (news.descripcion && news.descripcion.length > maxDescLength)
    ? `${news.descripcion.substring(0, maxDescLength)}...`
    : news.descripcion;

  card.innerHTML = `
    <img src="${news.imagen}" class="news-card-img" alt="${news.titulo}">
    <div class="news-card-body">
      <div class="news-card-meta">
        <span class="news-badge">${news.categoria || 'General'}</span>
        <span style="color: var(--text-muted);">${fechaFormateada}</span>
      </div>
      
      <h3 class="news-card-title">${news.titulo}</h3>
      <p class="news-card-desc">${descCorta}</p>

      <button class="read-more-btn" data-id="${news.id}">Leer más ➔</button>
    </div>
  `;

  return card;
}