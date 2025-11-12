import { NAV, CURSOS_INFO, INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES } from "../constants/constants.js";
import { Header } from "./header.js";
import { Navbar } from "./navbar.js";
import { Footer } from "./footer.js";
import { gestionarTipoInscripcion } from "./seccion-inscripcion/gestionarTipoInscripcion.js";

const header = new Header();
const barraNav = new Navbar();
const footer = new Footer();

header.mostrarHeader(CURSOS_INFO);
barraNav.mostrarItems(NAV);

const urlParams = new URLSearchParams(window.location.search);

const cursoInfo = {
  nombre: urlParams.get('curso') || "Curso",
  precio: urlParams.get('precio') || 0,
  img: urlParams.get('img') || "Sin imagen",
  valoracion: urlParams.get('valoracion') || 0,
  duracion: urlParams.get('duracion') || "Sin duracion",
  link: urlParams.get('ver') || "Sin link"
  
};

gestionarTipoInscripcion("#contenido-principal", cursoInfo);

footer.mostrarFooter(INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES);