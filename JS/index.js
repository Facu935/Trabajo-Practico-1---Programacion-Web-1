import { NAV } from "../constants/constants.js";
import { Navbar } from "./navbar.js";
import { SliderHome } from "./sliderHome.js";
import { IMAGENES_SLIDER_HOME } from "../constants/constants.js";
import { CURSOS_INFO } from "../constants/constants.js";    


const barraNav = new Navbar();
barraNav.mostrarItems(NAV);


const sliderHome = new SliderHome();
sliderHome.mostrarNodos(IMAGENES_SLIDER_HOME);
sliderHome.mostrarImagenesSegunNodoClickeado(IMAGENES_SLIDER_HOME);


mostrarCursosDestacados(CURSOS_INFO);


function mostrarCursosDestacados(cursos){
    const seccionCursosDestacados = document.querySelector("#cursos-destacados");
    
    mostrarTituloCursosDestacados(seccionCursosDestacados)
    mostrarGrillaCursosDestacados(cursos, seccionCursosDestacados);
    botonVerTodosLosCursos(seccionCursosDestacados);

}

function mostrarTituloCursosDestacados(seccion){
    const titulo = document.createElement('h2');
    titulo.classList.add("titulos")
    titulo.textContent = "CURSOS DESTACADOS";
    seccion.appendChild(titulo);

}

function mostrarGrillaCursosDestacados(cursos, seccion){
    //Cursos
    const contenedorCursos = document.createElement('div');
    contenedorCursos.classList.add("cursos");

    const contenedorPadre = document.createElement('div');
    contenedorPadre.id = "contenedor-grid-padre";

    //Grilla;
    cursos.forEach(item =>{
        if(item.destacado == true){
            const templateCursos =
            `<div class="contenedor-grid-hijo">
                <div class="contenedor-grid-hijo imagen">
                    <img src="${item.img}" alt="Logo ${item.nombre}" /> 
                </div>
                <div class="contenedor-grid-hijo titulo">
                    <h4>${item.nombre}</h4>
                </div>
                <div class="contenedor-grid-hijo datos">
                    <p>${item.duracion} HS</p>
                    <p>$ ${item.precio}</p>
                </div>
                <div class="contenedor-grid-hijo detalles-comprar">
                    <a href="${item.link}">Ver Detalles del Curso</a>
                    <button><a href="./pages/inscripcion.html">Inscribirme</a></button>
                </div>
            </div>`
                contenedorPadre.innerHTML += templateCursos;
        }
    });
    contenedorCursos.appendChild(contenedorPadre);
    seccion.appendChild(contenedorCursos);
}
function botonVerTodosLosCursos(seccion){
    const verTodoslosLosCursos = document.createElement('a')
    const botonVerTodosLosCursos = document.createElement('button');
    verTodoslosLosCursos.href = "./pages/otrosCursos.html";
    verTodoslosLosCursos.classList.add("boton-ver-cursos");
    botonVerTodosLosCursos.textContent = "VER TODOS LOS CURSOS";
    verTodoslosLosCursos.appendChild(botonVerTodosLosCursos);

    seccion.appendChild(verTodoslosLosCursos);
}




