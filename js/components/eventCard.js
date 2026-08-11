/**
 * Crea y retorna el elemento HTML para una tarjeta de evento
 * @param {Object} event - Objeto con los datos del evento
 * @returns {HTMLElement} Nodo de la tarjeta
 */
export function createEventCard(event) {
  const card = document.createElement('article');
  card.className = 'event-card';

  // Formatear fecha a texto legible (ej: "15 de agosto, 18:00 hs")
  const fechaObj = new Date(event.fecha);
  const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });

  card.innerHTML = `
    <div class="card-image-container">
      <span class="event-badge">${event.categoria || 'General'}</span>
      <img src="${event.imagen}" alt="${event.titulo}" class="event-card-image" loading="lazy">
    </div>
    <div class="event-card-body">

      <h3 class="event-title">${event.titulo}</h3>
      <p class="event-description">${event.descripcion}</p>
      
      <div class="event-meta">

        <div class="event-meta-item">

          <time datetime="${event.fecha}">${fechaFormateada}</time>
          
        </div>

        <div class="event-meta-item">

          <div class="event-meta-item">${event.lugar}</div>
       
        </div>
        
        <button class="read-more-btn" data-id="${event.id}">Leer Más</button>
      
      </div>
    </div>
  `;

  return card;
}