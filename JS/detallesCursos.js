import { NAV, CURSOS_INFO, INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES } from "../constants/constants.js";
import { Header } from "./header.js";
import { Navbar } from "./navbar.js";
import { Footer } from "./footer.js";
import { validarUsuarioConectadoParaNav } from "./funciones-generales.js";

const header = new Header();
const barraNav = new Navbar();
const footer = new Footer();

header.mostrarHeader(CURSOS_INFO);
barraNav.mostrarItems(NAV);
footer.mostrarFooter(INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES);

const cursos_info = CURSOS_INFO;

const cursoId = document.querySelector("[data-curso]").dataset.curso;
const modal = document.querySelector(".modal");
const boton = document.querySelectorAll(".boton-inscribirse");
const titulo = document.querySelector("#titulo-modal");
const imagen = document.querySelector("#modal-img-curso");
const duracion = document.querySelector("#duracion-modal");
const profesor = document.querySelector("#profesor-modal");
const valor = document.querySelector("#precio-modal");
const botonAceptar = document.querySelector("#boton-aceptar");
const botonCancelar = document.querySelector("#hidden-modal");
const unidades = document.querySelectorAll(".bloque-unidad");

let cursoSeleccionado = null;

const urlParams = new URLSearchParams(window.location.search);
const nombreCursoParams = urlParams.get("curso");

let cursoNombre = cursos_info.find(curso => curso.cursoId === nombreCursoParams);

unidades.forEach(element => {

    element.addEventListener("click", (e) => {

        const unidadElegida = e.currentTarget;
        mostrarUnidad(unidadElegida);
    });
});

function mostrarUnidad(unidad) {
    const unidadId = unidad.dataset.unidad;
    const clases = document.querySelector(`.clases[data-clases="${unidadId}"]`);

    const estabaAbierta = clases.classList.contains("show-clases");
    
    document.querySelectorAll(".clases").forEach(c => element.classList.remove("show-clases"));

    if (!estabaAbierta) {
        clases.classList.add("show-clases");
    }
}

boton.forEach(element => {

    element.addEventListener("click", (e) => {

        if (!validarUsuarioConectadoParaNav()) {
            alert("Para inscribirse debe tener una sesión iniciada.");
            return;
        }
        const cursoId = e.target.dataset.curso;
        cursoSeleccionado = cursos_info.find(curso => curso.cursoId === cursoId);

        mostrarModal(cursoSeleccionado)
    })
});

function mostrarModal(cursoSeleccionado) {
    titulo.textContent = `Te estas inscribiendo a ${cursoSeleccionado.nombre}`;
    imagen.src = cursoSeleccionado.img;
    imagen.alt = `Logo de ${cursoSeleccionado.nombre}`;
    duracion.textContent = `Duracion: ${cursoSeleccionado.duracion}`;
    profesor.textContent = `Profesor: ${cursoSeleccionado.profesor}`;
    valor.textContent = `Precio: $${cursoSeleccionado.precio}`

    modal.classList.add("show-modal");
    document.body.style.overflow = "hidden";
}

botonAceptar.addEventListener("click", () => {
    window.location.href = `../pages/inscripcion.html?curso=${encodeURIComponent(cursoSeleccionado.nombre)}&precio=${cursoSeleccionado.precio}`;
})

botonCancelar.addEventListener("click", () => {
    modal.classList.remove("show-modal");
    document.body.style.overflow = "";
});

