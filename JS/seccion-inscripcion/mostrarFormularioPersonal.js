import { crearFieldsetPersonal } from "./fieldset.js";
import { crearModal } from "./crearModal.js";
import { agregarCursoAlCarrito } from "./agregarCursoAlCarrito.js";

export function mostrarFormularioPersonal(selectorPadre, cursoInfo) {
  const contenedor = document.querySelector(selectorPadre);

  if (!contenedor) return;
  contenedor.innerHTML = "";

  const form = document.createElement('form');
  form.className = 'formulario';

  const titulo = document.createElement('h3');
  titulo.className = 'titulo-inscripcion';
  titulo.textContent = 'INSCRIPCIÓN PERSONAL';

  form.appendChild(titulo);

  const fieldset = crearFieldsetPersonal(1);
  form.appendChild(fieldset);

  const divPrecio = document.createElement('div');
  divPrecio.className = 'container-precio-inscribirse';
  divPrecio.innerHTML = `
        <p id="precio-total-display-personal">Precio total: $${parseFloat(cursoInfo.precio).toFixed(2)}</p>
        <button id="btn-mostrar-resumen-personal" class="btn-inscribirse" type="button">INSCRIBIRSE</button>
    `;

  form.appendChild(divPrecio);
  contenedor.appendChild(form);

  const btnInscribirse = document.getElementById('btn-mostrar-resumen-personal');
  const inputsPersonales = fieldset.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="tel"]');

  function mostrarResumenPersonal() {
    
    for (const input of inputsPersonales) {
      if (!input.checkValidity()) {
        alert(`Error en ${input.placeholder}: ${input.title}`);
        return;
      }
    }

    const exito = agregarCursoAlCarrito(cursoInfo.precio, cursoInfo);

    if (!exito) {
      return;
    }

    const nombre = fieldset.querySelector(`input[name="nombre-1"]`)?.value || 'N/A';
    const apellido = fieldset.querySelector(`input[name="apellido-1"]`)?.value || 'N/A';
    const dni = fieldset.querySelector(`input[name="dni-1"]`)?.value || 'N/A';
    const telefono = fieldset.querySelector(`input[name="telefono-1"]`)?.value || 'N/A';

    let resumenHtml = '<h3>Resumen de Inscripción</h3>';
    resumenHtml += '<h4>Participante:</h4><ul>';
    resumenHtml += `<li style="list-style-type: none;">
        <strong>Persona:</strong> ${nombre} ${apellido} (DNI: ${dni})<br>
        <small>Tel: ${telefono}</small>
      </li>`;
    resumenHtml += '</ul>';

    const total = document.getElementById('precio-total-display-personal').textContent;

    resumenHtml += `<div style="margin-top: 1rem; text-align: left;">
                      <p><strong>${total}</strong></p>
                    </div>`;

    resumenHtml += '<a href="../pages/carrito.html" class="btn-inscribirse" style="margin-top: 1rem; text-decoration: none; display: inline-block; padding: 0.5rem 1rem; text-align: center;">Ir a Pagar</a>';

    crearModal(resumenHtml);
  }

  btnInscribirse.addEventListener('click', mostrarResumenPersonal);
}