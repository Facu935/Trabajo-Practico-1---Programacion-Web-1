import { CURSOS_INFO } from "../constants/constants.js";
import { validarUsuarioConectadoParaNav } from "./funciones-generales.js";

const cursos_info = CURSOS_INFO;

const cursoId = document.querySelector("[data-curso]").dataset.curso;
const modal = document.querySelector(".modal");
const boton = document.querySelector("#boton-inscribirse");
const titulo = document.querySelector("#titulo-modal");
const imagen = document.querySelector("#modal-img-curso");
const duracion = document.querySelector("#duracion-modal");
const profesor = document.querySelector("#profesor-modal");
const valor = document.querySelector("#precio-modal");
const botonCancelar = document.querySelector("#hidden-modal");

boton.addEventListener("click", () => {

     if (!validarUsuarioConectadoParaNav()) {
        alert("Para inscribirse debe tener una sesión iniciada.");
        return;
    }
        const cursoSeleccionado = cursos_info.find(curso => curso.cursoId === cursoId);

        mostrarModal(cursoSeleccionado)
})

function mostrarModal(cursoSeleccionado){
    titulo.textContent=`Te estas inscribiendo a ${cursoSeleccionado.nombre}`;
    imagen.src = cursoSeleccionado.img;
    imagen.alt = `Logo de ${cursoSeleccionado.nombre}`;
    duracion.textContent=`Duracion: ${cursoSeleccionado.duracion}`;
    profesor.textContent=`Profesor: ${cursoSeleccionado.profesor}`;
    valor.textContent=`Precio: $${cursoSeleccionado.precio}`

    modal.classList.add("show-modal");
     document.body.style.overflow = "hidden";
}

botonCancelar.addEventListener("click", () => {
    modal.classList.remove("show-modal");
    document.body.style.overflow = "";
});