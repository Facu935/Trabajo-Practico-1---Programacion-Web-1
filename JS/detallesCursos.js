import { NAV, CURSOS_INFO, CLASES_CONTENIDOS_CURSOS, INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES, USUARIOS_REGISTRADOS } from "../constants/constants.js";
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
const claseContenidos = CLASES_CONTENIDOS_CURSOS;

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

const urlParams = new URLSearchParams(window.location.search);
const nombreCursoParams = urlParams.get("curso");

let cursoSeleccionado = cursos_info.find(curso => curso.cursoId === nombreCursoParams);
//Guarda el curso que recibe del link
//let cursoNombre = cursos_info.find(curso => curso.cursoId === nombreCursoParams);

//Creación html
const logoCurso = document.querySelector("#imagen");
logoCurso.src = cursoSeleccionado.img;
logoCurso.alt = `Logo ${cursoSeleccionado.nombre}`;

document.querySelector("#titulo-curso").textContent = cursoSeleccionado.nombre;

document.querySelector("#valoracion").textContent = cursoSeleccionado.valoracion;
document.querySelector("#cantidadEstudiantes").textContent = `${cursoSeleccionado.cantidadDeEstudiantes}k`;

document.querySelector("#descripcion").textContent = cursoSeleccionado.descripcion;

const contenedorLista = document.querySelector("#listaRequisitos");
cursoSeleccionado.requisitos.forEach(element => {
    const li = document.createElement("li");
    li.textContent = element;
    contenedorLista.appendChild(li);
});

document.querySelector("#duracion").textContent = `Duración: ${cursoSeleccionado.duracion} hs`;
document.querySelector("#precio").textContent = `$${cursoSeleccionado.precio}`;
document.querySelector("#btn-inscribirse-principal").dataset.curso = nombreCursoParams;
document.querySelector(".cupos").textContent = `${cursoSeleccionado.cuposDisponibles} CUPOS DISPONIBLES`;


const sectionUnidad = document.querySelector("#contenidos");
const contenedorUnidades = document.querySelector("#unidades");
const unidadesCurso = cursoSeleccionado.unidades;

unidadesCurso.forEach((unidad, i) => {

    const divUnidad = document.createElement("div");
    divUnidad.id = `unidad-${i + 1}`;

    const divBloque = document.createElement("div");
    divBloque.classList.add("bloque-unidad");
    divBloque.dataset.unidad = i + 1;

    const titulo = document.createElement("h4");
    titulo.textContent = `UNIDAD ${i + 1}: ${unidad.titulo}`;

    const img = document.createElement("img");
    img.src = "../IMG/Cursos/mas.png";
    img.alt = "ver más";

    divBloque.appendChild(titulo);
    divBloque.appendChild(img);

    const divClases = document.createElement("div");
    divClases.classList.add("clases");
    divClases.dataset.clases = i + 1;

    claseContenidos.forEach(contenido => {
        const divClase = document.createElement("div");
        divClase.classList.add("clase");

        const imgClase = document.createElement("img");
        imgClase.src = contenido.img;
        imgClase.alt = contenido.alt;

        const pClase = document.createElement("p");
        if (contenido.alt.includes("reproducir clase")) {
            pClase.textContent = `${unidad.duracion} hs`;
        } else {
            pClase.textContent = contenido.texto;
        }

        divClase.appendChild(imgClase);
        divClase.appendChild(pClase);
        divClases.appendChild(divClase);
    });

    divUnidad.appendChild(divBloque);
    divUnidad.appendChild(divClases);
    contenedorUnidades.appendChild(divUnidad);
});
sectionUnidad.appendChild(contenedorUnidades);

/////////////////

const unidades = document.querySelectorAll(".bloque-unidad");

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

    document.querySelectorAll(".clases").forEach(element => element.classList.remove("show-clases"));
    document.querySelectorAll(".bloque-unidad img").forEach(img => {
        img.src = "../IMG/Cursos/mas.png";
        img.alt = "ver más";
    });

    if (!estabaAbierta) {
        clases.classList.add("show-clases");

        const imgUnidad = unidad.querySelector("img");
        imgUnidad.src = "../IMG/Cursos/menos.png";
        imgUnidad.alt = "ver menos";
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

