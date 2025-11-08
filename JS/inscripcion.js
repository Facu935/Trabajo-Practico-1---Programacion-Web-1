import { NAV, CURSOS_INFO, INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES } from "../constants/constants.js";
import { Header } from "./header.js";
import { Navbar } from "./navbar.js";
import { crearFieldsetParticipante } from "./seccion-inscripcion/fieldset.js";
import { Footer } from "./footer.js";

const header = new Header();
const barraNav = new Navbar();
const footer = new Footer();

header.mostrarHeader(CURSOS_INFO);
barraNav.mostrarItems(NAV);

const urlParams = new URLSearchParams(window.location.search);
const precioBaseDelCurso = urlParams.get('precio') || 0;
const nombreDelCurso = urlParams.get('curso') || "Curso";

gestionarTipoInscripcion("#contenido-principal", nombreDelCurso);

footer.mostrarFooter(INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES);

function gestionarTipoInscripcion(selectorPadre, nombreDelCurso) {
  const contenedor = document.querySelector(selectorPadre);
  if (!contenedor) {
    console.error("Error: No se encontró el contenedor principal.");
    return;
  }

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

  // Llamamos a la función 1 vez para cargar la vista inicial (Personal, por 'checked')
  actualizarVista();
}

function actualizarVista() {
  const valorSeleccionado = document.querySelector('input[name="ambito"]:checked').value;
  const selectorContenedor = "#form-dinamico-container";

  if (valorSeleccionado === "personal") {
    mostrarFormularioPersonal(selectorContenedor, precioBaseDelCurso);
  } else if (valorSeleccionado === "empresarial") {
    mostrarFormularioEmpresarial(selectorContenedor, precioBaseDelCurso);
  } else if (valorSeleccionado === "empresarial") {
  }
}

function mostrarFormularioPersonal(selectorPadre, precio) {
  const contenedor = document.querySelector(selectorPadre);
  if (!contenedor) return;
  contenedor.innerHTML = ""; // Limpia el contenedor

  const form = document.createElement('form');
  form.action = '../pages/inscripcion-confirmada.html';
  form.className = 'formulario';

  const titulo = document.createElement('h3');
  titulo.className = 'titulo-inscripcion';
  titulo.textContent = 'INSCRIPCIÓN PERSONAL';
  form.appendChild(titulo);

  form.appendChild(crearFieldsetParticipante(1));
  //form.appendChild(crearFieldsetParticipante(2));
  //form.appendChild(crearFieldsetParticipante(3));

  // const divAddPersona = document.createElement('div');
  // divAddPersona.className = 'add-persona';
  // divAddPersona.innerHTML = `
  //       <span class="icon-add">&#10133;</span>
  //       <p>Agregar persona</p>
  //   `;
  // form.appendChild(divAddPersona);

  const divPrecio = document.createElement('div');
  divPrecio.className = 'container-precio-inscribirse';
  divPrecio.innerHTML = `
        <p>Precio total: $${precio}</p>
        <button class="btn-inscribirse" type="submit">INSCRIBIRSE</button>
    `;
  form.appendChild(divPrecio);

  contenedor.appendChild(form);
}

function mostrarFormularioEmpresarial(selectorPadre, precio) {
  const contenedor = document.querySelector(selectorPadre);
  if (!contenedor) return;
  contenedor.innerHTML = ""; // Limpia el contenedor

  const form = document.createElement('form');
  form.className = 'formulario';
  form.action = '../pages/inscripcion-confirmada.html';

  form.innerHTML = `
    <h3 class="titulo-inscripcion">INSCRIPCIÓN EMPRESARIAL</h3>
    <fieldset>
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
    <div class="container-precio-inscribirse">
        <p>Precio total: $${precio}</p>
        <button class="btn-inscribirse" type="submit">INSCRIBIRSE</button>
    </div>
  `;
  contenedor.appendChild(form);
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