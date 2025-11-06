import { NAV, CURSOS_INFO, INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE ,FOOTER_LINKS_CURSOS, FOOTER_REDES} from "../constants/constants.js";
import { Header } from "./header.js";
import { Navbar } from "./navbar.js";
import { Footer } from "./footer.js";
import { obtenerUsuarioLogueado } from "./funciones-generales.js";

const header = new Header();
const barraNav = new Navbar();
const footer = new Footer();
const CURSOS = obtenerUsuarioLogueado().cursosEnCarrito;


header.mostrarHeader(CURSOS_INFO);
barraNav.mostrarItems(NAV);


cursosEnCarrito(CURSOS);
footer.mostrarFooter(INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS,FOOTER_REDES);





function cursosEnCarrito(cursos){
    const SECTION = document.querySelector(".carrito-layout")
    const CARRITO = document.querySelector(".carrito");


    cursos.forEach(curso => {
        const templateCarrito = `<div class="carrito-item">
                    <div class="carrito-item imagen">
                        <img src="${curso.img}" alt="Logo ${curso.nombre}" class="imagen-curso">
                    </div>
                    <div class="carrito-item titulo-curso">
                        <h2>Curso ${curso.nombre}</h2>
                    </div>
                    <div class="carrito-item datos">
                        <div id="valoracion-curso">
                            <img src="../IMG/Cursos/estrella.png" alt="Valoracion del Curso">
                            <p>${curso.valoracion}</p>
                        </div>
                        <p>${curso.duracion} hs</p>
                    </div>
                    <div class="carrito-item precio-unitario">
                        <p>$ ${curso.precio}</p>
                    </div>
                </div>`
                CARRITO.innerHTML += templateCarrito;
    });
    SECTION.appendChild(CARRITO);

    const PRECIO_TOTAL = document.querySelector("#carrito-precio-total");
    const templatePrecioTotal =`<div id="carrito-precio-total"></div>
                        <h2>TOTAL</h2>
                    <p>$ ${calcularTotal(CURSOS)}</p>
                    <div class="carrito-botones">
                        <a href="../pages/pago.html"><button>CONFIRMAR COMPRA</button></a>
                        <a href="./index.html"><button id="boton-cancelar">CANCELAR COMPRA</button></a>
                    </div>
                    </div>`

    PRECIO_TOTAL.innerHTML = templatePrecioTotal;

    

}

function calcularTotal(cursos){
    let total = 0;
    cursos.forEach(curso => {
        total += curso.precio;
    })
    return total;
}