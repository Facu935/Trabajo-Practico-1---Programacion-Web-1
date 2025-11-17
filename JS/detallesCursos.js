import {
  NAV,
  CURSOS_INFO,
  CLASES_CONTENIDOS_CURSOS,
  INTEGRANTES_DEL_GRUPO,
  FOOTER_LINKS_ACERCA_DE,
  FOOTER_LINKS_CURSOS,
  FOOTER_REDES,
  USUARIOS_REGISTRADOS,
} from "../constants/constants.js";
import { Header } from "./header.js";
import { Navbar } from "./navbar.js";
import { Footer } from "./footer.js";
import "./eventoModal.js";
import { mostrarUnidad } from "./accordionCursos.js";

const cursos_info = CURSOS_INFO;
const claseContenidos = CLASES_CONTENIDOS_CURSOS;

const urlParams = new URLSearchParams(window.location.search);
const nombreCursoParams = urlParams.get("curso");

let cursoSeleccionado = cursos_info.find(
  (curso) => curso.cursoId === nombreCursoParams
);

const header = new Header();
const barraNav = new Navbar();
const footer = new Footer();

agregarTitle(cursoSeleccionado);
header.mostrarHeader(CURSOS_INFO);
barraNav.mostrarItems(NAV);
mostrarContenedorPrincipal(cursoSeleccionado);
mostrarContenidos(cursoSeleccionado);
mostrarContenedorDocente(cursoSeleccionado);
mostrarOpiniones(cursoSeleccionado);
mostrarCursosSimilares(cursoSeleccionado);
footer.mostrarFooter(
  INTEGRANTES_DEL_GRUPO,
  FOOTER_LINKS_ACERCA_DE,
  FOOTER_LINKS_CURSOS,
  FOOTER_REDES
);

//Creación html

function agregarTitle(cursoSeleccionado) {
  document.title = `Edu Courses | Curso de ${cursoSeleccionado.nombre}`;
}

function mostrarContenedorPrincipal(cursoSeleccionado) {
  const logoCurso = document.querySelector("#imagen");
  logoCurso.src = cursoSeleccionado.img;
  logoCurso.alt = `Logo ${cursoSeleccionado.nombre}`;

  document.querySelector("#titulo-curso").textContent =
    cursoSeleccionado.nombre;

  document.querySelector("#valoracion").textContent =
    cursoSeleccionado.valoracion;
  document.querySelector(
    "#cantidadEstudiantes"
  ).textContent = `${cursoSeleccionado.cantidadDeEstudiantes}k`;

  document.querySelector("#descripcion").textContent =
    cursoSeleccionado.descripcion;

  const contenedorLista = document.querySelector("#listaRequisitos");
  cursoSeleccionado.requisitos.forEach((element) => {
    const li = document.createElement("li");
    li.textContent = element;
    contenedorLista.appendChild(li);
  });

  document.querySelector(
    "#duracion"
  ).textContent = `Duración: ${cursoSeleccionado.duracion} hs`;
  document.querySelector(
    "#precio"
  ).textContent = `$${cursoSeleccionado.precio}`;
  document.querySelector("#btn-inscribirse-principal").dataset.curso =
    nombreCursoParams;
  document.querySelector(
    ".cupos"
  ).textContent = `${cursoSeleccionado.cuposDisponibles} CUPOS DISPONIBLES`;
}

function mostrarContenidos(cursoSeleccionado) {
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

    claseContenidos.forEach((contenido) => {
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
}

function mostrarContenedorDocente(cursoSeleccionado) {
  const contenedorDocente = document.querySelector("#contenedor-docente");

  const divImgDocente = document.createElement("div");
  const imgDocente = document.createElement("img");
  imgDocente.src = "../IMG/Cursos/profesor.jpg";
  imgDocente.alt = "imagén del profesor";
  imgDocente.id = "imagen-profe";

  const divInfoDocente = document.createElement("div");
  divInfoDocente.id = "info";
  const nombreDocente = document.createElement("h2");
  nombreDocente.textContent = cursoSeleccionado.docente.nombre;
  const pDocente = document.createElement("p");
  pDocente.textContent = cursoSeleccionado.docente.descripcion;
  const divValoracionDocente = document.createElement("div");

  divValoracionDocente.id = "contenedor-estrella";
  const imgEstrella = document.createElement("img");
  imgEstrella.src = "../IMG/Cursos/estrella.png";
  imgEstrella.alt = "Valoración del docente";
  const pValoracion = document.createElement("p");
  pValoracion.textContent = cursoSeleccionado.docente.valoracion;

  divValoracionDocente.appendChild(imgEstrella);
  divValoracionDocente.appendChild(pValoracion);
  divInfoDocente.appendChild(nombreDocente);
  divInfoDocente.appendChild(pDocente);
  divInfoDocente.appendChild(divValoracionDocente);
  divImgDocente.appendChild(imgDocente);
  contenedorDocente.appendChild(divImgDocente);
  contenedorDocente.appendChild(divInfoDocente);
}

function mostrarOpiniones(cursoSeleccionado) {
  const contenedorOpiniones = document.querySelector("#contenedor-opiniones");

  cursoSeleccionado.opiniones.forEach((opinion) => {
    const divOpina = document.createElement("div");

    const estrellas =
      `<img src="../IMG/Cursos/estrella.png" alt="estrella">`.repeat(
        opinion.cantidad
      );

    divOpina.innerHTML = `
        <h3>${opinion.nombre}</h3>
        ${estrellas}
        <p>${opinion.comentario}</p>
    `;

    contenedorOpiniones.appendChild(divOpina);
  });
}

function mostrarCursosSimilares(cursoSeleccionado) {
  const contenedorCursosSimilares = document.querySelector(".cursos-similares");

  cursoSeleccionado.cursosSimilares.forEach((cursoId) => {
    const cursoSimilar = CURSOS_INFO.find((c) => c.cursoId === cursoId);

    const divCurso = document.createElement("div");
    divCurso.classList.add("contenedor-curso");
    const divLogoCurso = document.createElement("div");
    divLogoCurso.classList.add("imagen-curso-similar");
    const imgLogo = document.createElement("img");
    imgLogo.src = cursoSimilar.img;
    imgLogo.alt = `Logo ${cursoSimilar.nombre}`;

    const divTitulo = document.createElement("div");
    divTitulo.classList.add("titulo-curso");
    const tituloCurso = document.createElement("h4");
    tituloCurso.textContent = `CURSO ${cursoSimilar.nombre}`;

    const divVerComprar = document.createElement("div");
    divVerComprar.classList.add("abrir-comprar");
    divVerComprar.innerHTML = `
        <a href=${cursoSimilar.link}>Ver Detalles</a>
        <button class="boton-inscribirse" data-curso="${cursoSimilar.cursoId}">INSCRIBIRME</button> 
    `;

    const divPrecioHoras = document.createElement("div");
    divPrecioHoras.classList.add("duracion-valor");
    divPrecioHoras.innerHTML = `
        <p>${cursoSimilar.duracion} hs</p>
        <p>$${cursoSimilar.precio}</p>
    `;

    divLogoCurso.appendChild(imgLogo);
    divTitulo.appendChild(tituloCurso);

    divCurso.appendChild(divLogoCurso);
    divCurso.appendChild(divTitulo);
    divCurso.appendChild(divVerComprar);
    divCurso.appendChild(divPrecioHoras);

    contenedorCursosSimilares.appendChild(divCurso);
  });
}

///////////ACCORDION

const unidades = document.querySelectorAll(".bloque-unidad");

unidades.forEach((element) => {
  element.addEventListener("click", () => {
    mostrarUnidad(element);
  });
});
