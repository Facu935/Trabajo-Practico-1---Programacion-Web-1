import { NAV, CURSOS_INFO, INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES } from "../constants/constants.js";
import { validarUsuarioConectadoParaNav } from "./funciones-generales.js";
import { Header } from "./header.js";
import { Navbar } from "./navbar.js";
import { Footer } from "./footer.js";

const header = new Header();
const barraNav = new Navbar();
const footer = new Footer();

header.mostrarHeader(CURSOS_INFO);
barraNav.mostrarItems(NAV);
grillaCompleta(CURSOS_INFO);
footer.mostrarFooter(INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES);

function grillaCompleta(cursos) {
    const main = document.getElementsByTagName("main")[0];
    const TITULO = document.createElement("h1");
    TITULO.textContent = "TODOS NUESTROS CURSOS";
    main.appendChild(TITULO);

    const section = document.querySelector(".otros-cursos");
    cursos.forEach(curso => {
        let linkAUsar;

        if (validarUsuarioConectadoParaNav()) {
            linkAUsar = `../pages/inscripcion.html?curso=${encodeURIComponent(curso.nombre)}&precio=${curso.precio}`;
        } else {
            linkAUsar = `../pages/login.html`;
        }

        const templateRecuadro = `<div class="otros-cursos-recuadro">
            <div class="otro-cursos-recuadro imagen">
                <img src="${curso.img}" alt="Logo ${curso.nombre}">
            </div>
            <div class="otro-cursos-recuadro titulo">
                <h2>${curso.nombre}</h2>
            </div>
            <div class="otro-cursos-recuadro datos">
                <p>${curso.duracion} hs</p>
                <p>$ ${curso.precio}</p>
            </div>
            <div class="otro-cursos-recuadro detalle">
                <a href="${curso.link}">Ver Detalles</a>
            </div>
            <div class="otro-cursos-recuadro inscripcion">
                <a href="${linkAUsar}"><button>Inscribirme</button></a>
            </div>
        </div>`;
        section.innerHTML += templateRecuadro;
    });

    main.appendChild(section);
}