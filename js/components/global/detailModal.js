// js/components/detailModal.js
import { createFavButton } from './favButton.js';
import { createShareButton } from './shareButton.js';

export function openDetailModal(item) {
  // 1. Buscar si ya existe el modal en el DOM o crearlo
  let modal = document.getElementById('global-detail-modal');

  if (!modal) {
    modal = document.createElement('dialog');
    modal.id = 'global-detail-modal';
    modal.className = 'detail-modal';
    document.body.appendChild(modal);
  }

  const fechaFormateada = new Date(item.fecha).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // 2. Inyectar la plantilla HTML (dejamos .modal-actions vacío para inyectar los botones después)
  modal.innerHTML = `
    <div class="modal-content">
      <div = "card-image-container">
      <span class="event-badge" style="margin-bottom: 0.5rem; display: inline-block;">
        ${item.categoria || 'General'}
      </span>
      <img src="${item.imagen}" alt="${item.titulo}" class="modal-img">
      </div>

      <div class="modal-body">
        <div class="modal-header">
          <div>
            
            <h2 class="modal-title">${item.titulo}</h2>
          </div>
          <button class="modal-close-btn" id="close-modal-btn">✕</button>
        </div>

        <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 1rem;">
           ${fechaFormateada} ${item.lugar ? `|  ${item.lugar}` : ''}
        </p>

        <p style="line-height: 1.6; color: #334155;">
          ${item.descripcionLarga || item.descripcion}
        </p>

        <!-- Contenedor de acciones -->
        <div class="modal-actions"></div>
      </div>
    </div>
  `;

  // 3. Inyectamos los botones en las acciones del modal
  const actionsContainer = modal.querySelector('.modal-actions');

  // 4. Botón de favoritousss
  const favBtn = createFavButton(item.id, { showLabel: true });
  actionsContainer.appendChild(favBtn);

  //5. Botón para compartirle a tu amigo el pendejo
  const shareBtn = createShareButton({
    title: item.titulo,
    text: item.descripcion,
    url: window.location.href // O el link directo al item si usas rutas
  }, { showLabel: true
  })

  actionsContainer.appendChild(shareBtn);

  // 6. Evento para cerrar el modal con la 'X'
  modal.querySelector('#close-modal-btn').addEventListener('click', () => {
    modal.close();
  });

  // 7. Cerrar al hacer clic en el backdrop fuera del modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });

  // 8. Mostrar el modal nativo centrado
  modal.showModal();
}