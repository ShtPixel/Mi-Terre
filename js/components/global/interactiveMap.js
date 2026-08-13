import { openDetailModal } from './detailModal.js';

/**
 * Crea un mapa interactivo con pines para eventos o noticias
 * @param {Array} items - Lista de items con coordenadas { lat, lng, titulo, imagen, ... }
 * @param {Object} [centerCoords={ lat: 4.5709, lng: -74.2973 }] - Centro inicial del mapa
 */
export function createInteractiveMap(items = [], centerCoords = { lat: 1.126685,lng:-77.853676
 }) {
  const mapContainer = document.createElement('div');
  mapContainer.className = 'map-wrapper';
  mapContainer.style.cssText = 'width: 100%; height: 380px; border-radius: var(--radius, 12px); overflow: hidden; margin-bottom: 2rem; border: 1px solid #e2e8f0;';

  const mapId = `map-${Math.random().toString(36).substring(2, 9)}`;
  mapContainer.id = mapId;

  // Esperar a que el elemento se monte en el DOM para inicializar Leaflet
  setTimeout(() => {
    if (typeof L === 'undefined') {
      console.error('Leaflet no está cargado. Asegúrate de incluir la librería en index.html');
      return;
    }

    const map = L.map(mapId).setView([centerCoords.lat, centerCoords.lng], 12);

    // Servidor de mapas OpenStreetMap (Gratuito y sin API Key)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // Agregar pines marcadores para cada elemento que tenga coordenadas válidas
    items.forEach(item => {
      if (item.lat && item.lng) {
        const marker = L.marker([item.lat, item.lng]).addTo(map);

        const popupContent = `
          <div style="text-align: center; max-width: 180px;">
            <img src="${item.imagen}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 6px; margin-bottom: 6px;" />
            <h4 style="margin: 0 0 4px 0; font-size: 0.9rem;">${item.titulo}</h4>
            <button id="btn-map-${item.id}" style="background: var(--primary-color, #2563eb); color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.75rem; margin-top: 4px;">
              Ver detalle
            </button>
          </div>
        `;

        marker.bindPopup(popupContent);

        // Evento al abrir el popup para conectar el botón con el modal
        marker.on('popupopen', () => {
          const btn = document.getElementById(`btn-map-${item.id}`);
          if (btn) {
            btn.addEventListener('click', () => {
              openDetailModal(item);
            });
          }
        });
      }
    });
  }, 100);

  return mapContainer;
}