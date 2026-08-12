const PATH_SHARE = '../../assets/icons/share.svg'; // Revisa que el nombre coincida con tu SVG

/**
 * Crea un botón de compartir reutilizable
 * @param {Object} shareData - Información del elemento a compartir
 * @param {string} shareData.title - Título de la noticia o evento
 * @param {string} [shareData.text] - Descripción corta
 * @param {string} [shareData.url] - URL a compartir (opcional, por defecto usa la actual)
 * @param {Object} [options] - Opciones de personalización
 * @param {boolean} [options.showLabel=false] - Si muestra texto junto al icono ("Compartir")
 * @param {string} [options.customClass=''] - Clases CSS adicionales
 */
export function createShareButton(shareData, options = { showLabel: false, customClass: '' }) {
  const btn = document.createElement('button');
  btn.className = `share-btn ${options.customClass}`.trim();
  btn.setAttribute('aria-label', 'Compartir');

  btn.innerHTML = `
    <span class="share-icon" aria-hidden="true">
      <img src="${PATH_SHARE}" alt="" class="share-icon-img" width="20" height="20" />
    </span>
    ${options.showLabel ? `<span class="share-label">Compartir</span>` : ''}
  `;

  btn.addEventListener('click', async (e) => {
    e.stopPropagation(); // Prevenir abrir modal si está en una card

    const dataToShare = {
      title: shareData.title || document.title,
      text: shareData.text || '',
      url: shareData.url || window.location.href
    };

    // 1. Intentar usar la Web Share API (Móviles / Navegadores compatibles)
    if (navigator.share) {
      try {
        await navigator.share(dataToShare);
      } catch (err) {
        // El usuario canceló la acción de compartir, no hacemos nada
      }
    } else {
      // 2. Fallback para escritorios: Copiar al portapapeles
      try {
        await navigator.clipboard.writeText(dataToShare.url);
        
        // Feedback visual temporal en el botón
        const label = btn.querySelector('.share-label');
        const originalText = label ? label.textContent : '';

        if (label) label.textContent = '¡Copiado!';
        btn.classList.add('copied');

        setTimeout(() => {
          if (label) label.textContent = originalText;
          btn.classList.remove('copied');
        }, 2000);

      } catch (err) {
        console.error('Error al copiar al portapapeles:', err);
      }
    }
  });

  return btn;
}