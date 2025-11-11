import { crearFieldsetTipoInscripcion } from "./crearFieldsetTipoInscripcion.js";
import { actualizarVista } from "./actualizarVista.js";

export function gestionarTipoInscripcion(selectorPadre, cursoInfo) {
  const contenedor = document.querySelector(selectorPadre);

  const main = document.createElement('main');
  main.className = 'container';

  const divWrapper = document.createElement('div');
  const createTituloDelCurso = document.createElement('h2');
  createTituloDelCurso.textContent = `Formulario de Inscripción: ${cursoInfo.nombre}`
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
    radio.addEventListener("change", () => actualizarVista(cursoInfo));
  });

  actualizarVista(cursoInfo);
}