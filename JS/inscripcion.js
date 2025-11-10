import { NAV, CURSOS_INFO, INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES } from "../constants/constants.js";
import { Header } from "./header.js";
import { Navbar } from "./navbar.js";
import { crearFieldsetPersonal } from "./seccion-inscripcion/fieldset.js";
import { Footer } from "./footer.js";
import {
  obtenerUsuarioLogueado, guardarModificacionLocalStorageUsuarioLogueado, localStorageUsuarios, guardarModificacionLocalStorage
} from "./funciones-generales.js";

const header = new Header();
const barraNav = new Navbar();
const footer = new Footer();

header.mostrarHeader(CURSOS_INFO);
barraNav.mostrarItems(NAV);

const urlParams = new URLSearchParams(window.location.search);

const nombreDelCurso = urlParams.get('curso') || "Curso";
const precioBaseDelCurso = urlParams.get('precio') || 0;
const imgDelCurso = urlParams.get('img') || "Sin imagen";
const valoracionDelCurso = urlParams.get('valoracion') || 0;
const duracionDelCurso = urlParams.get('duracion') || "Sin duracion";

gestionarTipoInscripcion("#contenido-principal", nombreDelCurso);

footer.mostrarFooter(INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES);

function gestionarTipoInscripcion(selectorPadre, nombreDelCurso) {
  const contenedor = document.querySelector(selectorPadre);

  const main = document.createElement('main');
  main.className = 'container';

  const divWrapper = document.createElement('div');
  const createTituloDelCurso = document.createElement('h2');
  createTituloDelCurso.textContent = `Formulario de Inscripción: ${nombreDelCurso}`
  createTituloDelCurso.classList.add('pregunta-inscripcion')

  const preguntaUsuarioText = document.createElement('h3');
  preguntaUsuarioText.textContent = 'Ámbito de la inscripción'
  preguntaUsuarioText.classList.add('pregunta-inscripcion')

  const seleccionUsuarioText = document.createElement('p');
  seleccionUsuarioText.textContent = 'Seleccione una opción:'
  seleccionUsuarioText.classList.add('opcion-inscripcion');

  divWrapper.appendChild(createTituloDelCurso)
  divWrapper.appendChild(preguntaUsuarioText)
  divWrapper.appendChild(seleccionUsuarioText)

  divWrapper.appendChild(crearFieldsetTipoInscripcion())

  const contenedorDinamico = document.createElement('div');
  contenedorDinamico.id = "form-dinamico-container";

  divWrapper.appendChild(contenedorDinamico);
  main.appendChild(divWrapper);
  contenedor.appendChild(main);

  const radiosTipo = document.querySelectorAll('input[name="ambito"]');
  radiosTipo.forEach((radio) => {
    radio.addEventListener("change", actualizarVista);
  });

  actualizarVista();
}

function actualizarVista() {
  const valorSeleccionado = document.querySelector('input[name="ambito"]:checked').value;
  const selectorContenedor = "#form-dinamico-container";

  if (valorSeleccionado === "personal") {
    mostrarFormularioPersonal(selectorContenedor, precioBaseDelCurso);
  } else if (valorSeleccionado === "empresarial") {
    mostrarFormularioEmpresarial(selectorContenedor, precioBaseDelCurso);
  }
}

function mostrarFormularioPersonal(selectorPadre, precio) {
  const contenedor = document.querySelector(selectorPadre);

  if (!contenedor) return;
  contenedor.innerHTML = "";

  const form = document.createElement('form');
  form.action = '../pages/inscripcion-confirmada.html';
  form.className = 'formulario';

  const titulo = document.createElement('h3');
  titulo.className = 'titulo-inscripcion';
  titulo.textContent = 'INSCRIPCIÓN PERSONAL';

  form.appendChild(titulo);
  form.appendChild(crearFieldsetPersonal(1));

  const divPrecio = document.createElement('div');
  divPrecio.className = 'container-precio-inscribirse';
  divPrecio.innerHTML = `
        <p>Precio total: $${precio}</p>
        <button class="btn-inscribirse" type="submit">INSCRIBIRSE</button>
    `;

  form.appendChild(divPrecio);
  contenedor.appendChild(form);
}

function mostrarFormularioEmpresarial(selectorPadre, precioBase) {
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
            <input type="text" id="razon-social" name="razon-social" placeholder="Razón Social" required />
        </div>
        <div class="container-input">
            <input type="text" id="cuit" name="cuit" placeholder="CUIT" required />
        </div>
        <div class="container-input">
            <input type="email" id="email-corp" name="email-corp" placeholder="Email Corporativo" required />
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
    validarFormularioCompleto();
  });

  form.appendChild(divAddPersona);

  const divPrecio = document.createElement('div');
  divPrecio.className = 'container-precio-inscribirse';

  divPrecio.innerHTML = `
      <div class"price-details">
        <p id="precio-base-display">Precio del Curso: $${parseFloat(precioBase).toFixed(2)}</p>
        <p id="precio-participantes-display">Costo Participantes: $0.00</p>
        <p id="precio-total-display-empresa" style="font-weight: bold; margin-top: 5px;">Precio Total: $${parseFloat(precioBase).toFixed(2)}</p>
      </div>
      <button id="btn-mostrar-resumen-empresa" class="btn-inscribirse" type="button" disabled>INSCRIBIRSE</button>
    `;

  form.appendChild(divPrecio);
  contenedor.appendChild(form);

  const btnInscribirse = document.getElementById('btn-mostrar-resumen-empresa');
  const inputsEmpresa = form.querySelectorAll('#razon-social, #cuit, #email-corp');

  inputsEmpresa.forEach(input => {
    input.addEventListener('input', validarFormularioCompleto);
  });

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
        validarFormularioCompleto();
      } else {
        fieldset.remove();
        validarFormularioCompleto();
      }
      actualizarPrecioTotal();
    });

    divBoton.appendChild(btnEliminar);
    fieldset.appendChild(divBoton);
    contenedorFieldsets.appendChild(fieldset);

    const inputsParticipante = fieldset.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="tel"]');

    inputsParticipante.forEach(input => {
      input.addEventListener('input', validarFormularioCompleto);
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
      if (input.value.trim() === '') {
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

  function validarFormularioCompleto() {
    let todosCompletos = true;

    for (const input of inputsEmpresa) {
      if (input.value.trim() === '') {
        todosCompletos = false;
        break;
      }
    }

    if (todosCompletos) {
      const inputsParticipantes = contenedorFieldsets.querySelectorAll('input[type="text"], input[type="email"], input[type="number"], input[type="tel"]');
      if (inputsParticipantes.length === 0) {
        todosCompletos = false;
      }
      for (const input of inputsParticipantes) {
        if (input.value.trim() === '') {
          todosCompletos = false;
          break;
        }
      }
    }

    if (todosCompletos) {
      btnInscribirse.disabled = false;
    } else {
      btnInscribirse.disabled = true;
    }

  }

  function actualizarPrecioTotal() {
    const numeroDePersonas = document.querySelectorAll('#contenedor-fieldsets-empresa fieldset').length;
    const precioBaseNum = parseFloat(precioBase) || 0;
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
    try {
      const usuarioLogueado = obtenerUsuarioLogueado();

      if (usuarioLogueado) {
        const pPrecioTotalElement = document.getElementById('precio-total-display-empresa');

        const precioTotalCalculado = pPrecioTotalElement.textContent.split('$')[1] || 0;

        const cursoCompleto = {
          nombre: nombreDelCurso,
          precio: parseFloat(precioTotalCalculado),
          img: imgDelCurso,
          valoracion: valoracionDelCurso,
          duracion: duracionDelCurso
        };

        const yaInscripto = usuarioLogueado.cursosEnCarrito.find(curso => curso.nombre === cursoCompleto.nombre);

        if (!yaInscripto) {
          usuarioLogueado.cursosEnCarrito.push(cursoCompleto);

          guardarModificacionLocalStorageUsuarioLogueado(usuarioLogueado);

          const todosLosUsuarios = localStorageUsuarios();
          const indiceUsuario = todosLosUsuarios.findIndex(user => user.email === usuarioLogueado.email);

          if (indiceUsuario !== -1) {
            todosLosUsuarios[indiceUsuario] = usuarioLogueado;
            guardarModificacionLocalStorage(todosLosUsuarios);
            console.log(`Curso (objeto) '${cursoCompleto.nombre}' agregado a ${usuarioLogueado.email}`);
          } else {
            console.warn("No se encontró al usuario en el array principal para actualizar.");
          }

        } else {
          console.log("El usuario ya está inscripto en este curso.");
        }
      } else {
        console.warn("No hay usuario logueado. No se puede inscribir el curso.");
      }
    } catch (error) {
      console.error("Error al inscribir el curso:", error);
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

  function crearModal(contenido) {
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

  contadorPersonas = 1;
  agregarCamposPersona(contadorPersonas);
  actualizarPrecioTotal();
  btnInscribirse.addEventListener('click', mostrarResumen);
}

function crearFieldsetTipoInscripcion() {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'fieldset-ambito'

  const templateInterno =
    `         
    <div class="container-input-ambito">
        <input type="radio" id="radio-personal" name="ambito" value="personal" checked>
        <label for="radio-personal">Personal</label> 
    </div>
    
    <div class="container-input-ambito">
        <input type="radio" id="radio-empresarial" name="ambito" value="empresarial">
        <label for="radio-empresarial">Empresarial</label> 
    </div>
  `;

  fieldset.innerHTML = templateInterno;
  return fieldset;
}