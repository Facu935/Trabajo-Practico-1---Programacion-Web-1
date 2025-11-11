export function crearModal(contenido) {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.innerHTML = contenido;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.id === 'btn-cerrar-modal') {
      document.body.removeChild(overlay);
    }
  });
}
