import { crearFieldsetPersonal } from "./fieldset.js";
import { crearModal } from "./crearModal.js";
import { agregarCursoAlCarrito } from "./agregarCursoAlCarrito.js";

export function mostrarFormularioEmpresarial(selectorPadre, cursoInfo) {
  const contenedor = document.querySelector(selectorPadre);

  if (!contenedor) return;
  contenedor.innerHTML = "";

  const costoPorPersona = 20;
  let contadorPersonas = 0;
  const form = document.createElement('form');

  form.className = 'formulario';
  form.innerHTML = `
    <h3 class="titulo-inscripcion">INSCRIPCIÓN EMPRESARIAL</h3>
    <fieldset>
        <legend>Datos de la Empresa</legend>
        <div class="container-input">
            <input type="text" id="razon-social" name="razon-social" placeholder="Razón Social" required 
                   pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ ]+" 
                   title="Solo puedes ingresar letras y espacios." />
        </div>
        <div class="container-input">
            <input type="text" id="cuit" name="cuit" placeholder="CUIT" required 
                   inputmode="numeric" 
                   pattern="\\d{11}" 
                   title="Solo números (11 dígitos sin guiones)." />
        </div>
        <div class="container-input">
            <input type="email" id="email-corp" name="email-corp" placeholder="Email Corporativo" required 
                   title="Ingresa un formato de email válido (ej: info@empresa.com)." />
        </div>
    </fieldset>
  `;

  const tituloParticipantes = document.createElement('h4');
  tituloParticipantes.textContent = 'Datos de los Participantes';
  tituloParticipantes.style.marginTop = '2rem';
  tituloParticipantes.style.marginBottom = '1rem';

  form.appendChild(tituloParticipantes);

  const contenedorFieldsets = document.createElement('div');
  contenedorFieldsets.id = 'contenedor-fieldsets-empresa';

  form.appendChild(contenedorFieldsets);

  const divAddPersona = document.createElement('div');
  divAddPersona.className = 'add-persona add-persona-disabled';
  divAddPersona.innerHTML = `<span class="icon-add">&#10133;</span><p>Agregar persona</p>`;

  divAddPersona.addEventListener('click', () => {
    if (divAddPersona.classList.contains('add-persona-disabled')) return;
    contadorPersonas++;
    agregarCamposPersona(contadorPersonas);
    actualizarPrecioTotal();
  });

  form.appendChild(divAddPersona);

  const divPrecio = document.createElement('div');
  divPrecio.className = 'container-precio-inscribirse';

  divPrecio.innerHTML = `
      <div class"price-details">
        <p id="precio-base-display">Precio del Curso: $${parseFloat(cursoInfo.precio).toFixed(2)}</p>
        <p id="precio-participantes-display">Costo Participantes: $0.00</p>
        <p id="precio-total-display-empresa" style="font-weight: bold; margin-top: 5px;">Precio Total: $${parseFloat(cursoInfo.precio).toFixed(2)}</p>
      </div>
      <button id="btn-mostrar-resumen-empresa" class="btn-inscribirse" type="button">INSCRIBIRSE</button>
    `;

  form.appendChild(divPrecio);
  contenedor.appendChild(form);

  const btnInscribirse = document.getElementById('btn-mostrar-resumen-empresa');

  function agregarCamposPersona(id) {
    const fieldset = crearFieldsetPersonal(id);
    fieldset.dataset.personId = id;

    const divBoton = document.createElement('div');
    divBoton.className = 'container-button';

    const btnEliminar = document.createElement('button');
    btnEliminar.type = 'button';
    btnEliminar.className = 'icon-delete';
    btnEliminar.innerHTML = '&#10006;';
    btnEliminar.addEventListener('click', () => {
      if (id === 1) {
        fieldset.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="tel"]').forEach(input => {
          input.value = '';
        });
        validarYAlternarBotonAdd();
      } else {
        fieldset.remove();
      }
      actualizarPrecioTotal();
    });

    divBoton.appendChild(btnEliminar);
    fieldset.appendChild(divBoton);
    contenedorFieldsets.appendChild(fieldset);

    const inputsParticipante = fieldset.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="tel"]');

    inputsParticipante.forEach(input => {
      if (id === 1) {
        input.addEventListener('input', validarYAlternarBotonAdd);
      }
    });

  }

  function validarYAlternarBotonAdd() {
    const primerFieldset = document.querySelector('#contenedor-fieldsets-empresa fieldset[data-person-id="1"]');

    if (!primerFieldset) return;
    const inputs = primerFieldset.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="tel"]');

    let todosLlenos = true;

    for (const input of inputs) {
      if (!input.checkValidity()) {
        todosLlenos = false;
        break;
      }
    }

    if (todosLlenos) {
      divAddPersona.classList.remove('add-persona-disabled');
    } else {
      divAddPersona.classList.add('add-persona-disabled');
    }
  }
  
  function actualizarPrecioTotal() {
    const numeroDePersonas = document.querySelectorAll('#contenedor-fieldsets-empresa fieldset').length;
    const precioBaseNum = parseFloat(cursoInfo.precio) || 0;
    const costoTotalParticipantes = numeroDePersonas * costoPorPersona;
    const total = precioBaseNum + costoTotalParticipantes;
    const pPrecioBase = document.getElementById('precio-base-display');
    const pPrecioParticipantes = document.getElementById('precio-participantes-display');
    const pPrecioTotal = document.getElementById('precio-total-display-empresa');

    if (pPrecioBase) {
      pPrecioBase.textContent = `Precio del Curso: $${precioBaseNum.toFixed(2)}`;
    }

    if (pPrecioParticipantes) {
      pPrecioParticipantes.textContent = `Costo Participantes (${numeroDePersonas} x $${costoPorPersona}): $${costoTotalParticipantes.toFixed(2)}`;
    }

    if (pPrecioTotal) {
      pPrecioTotal.textContent = `Precio Total: $${total.toFixed(2)}`;
    }
  }

  function mostrarResumen() {
    const todosLosInputs = form.querySelectorAll('input[required]');
    for (const input of todosLosInputs) {
      if (!input.checkValidity()) {
        alert(`Error en ${input.placeholder}: ${input.title}`);
        return;
      }
    }

    const pPrecioTotalElement = document.getElementById('precio-total-display-empresa');
    const precioTotalCalculado = pPrecioTotalElement.textContent.split('$')[1] || 0;
    const exito = agregarCursoAlCarrito(precioTotalCalculado, cursoInfo);

    if (!exito) {
      return;
    }

    const fieldsets = document.querySelectorAll('#contenedor-fieldsets-empresa fieldset');
    let resumenHtml = '<h3>Resumen de Inscripción</h3>';

    const razonSocial = document.getElementById('razon-social').value;
    const cuit = document.getElementById('cuit').value;
    resumenHtml += `<p><strong>Empresa:</strong> ${razonSocial || 'N/A'} (CUIT: ${cuit || 'N/A'})</p>`;
    resumenHtml += '<h4>Participantes:</h4><ul>';

    fieldsets.forEach((fs, index) => {
      const id = fs.dataset.personId;
      const nombre = fs.querySelector(`input[name="nombre-${id}"]`)?.value || 'N/A';
      const apellido = fs.querySelector(`input[name="apellido-${id}"]`)?.value || 'N/A';
      const dni = fs.querySelector(`input[name="dni-${id}"]`)?.value || 'N/A';
      const email = fs.querySelector(`input[name="email-${id}"]`)?.value || 'N/A';
      const telefono = fs.querySelector(`input[name="telefono-${id}"]`)?.value || 'N/A';

      resumenHtml += `<li style="list-style-type: none;">
          <strong>Persona ${index + 1}:</strong> ${nombre} ${apellido} (DNI: ${dni})<br>
          <small>Tel: ${telefono}</small>
        </li>`;
    });

    resumenHtml += '</ul>';

    const base = document.getElementById('precio-base-display').textContent;
    const participantes = document.getElementById('precio-participantes-display').textContent;
    const total = document.getElementById('precio-total-display-empresa').textContent;

    resumenHtml += `<div style="margin-top: 1rem; text-align: left;">
                      <p>${base}</p>
                      <p>${participantes}</p>
                      <p><strong>${total}</strong></p>
                    </div>`;

    resumenHtml += '<a href="../pages/carrito.html" class="btn-inscribirse" style="margin-top: 1rem; text-decoration: none; display: inline-block; padding: 0.5rem 1rem; text-align: center;">Ir a Pagar</a>';

    crearModal(resumenHtml);
  }

  contadorPersonas = 1;
  agregarCamposPersona(contadorPersonas);
  actualizarPrecioTotal();
  btnInscribirse.addEventListener('click', mostrarResumen);
}