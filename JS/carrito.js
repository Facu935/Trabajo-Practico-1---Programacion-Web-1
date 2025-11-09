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



function cursosEnCarrito(array_cursos){
    const CARRITO = document.querySelector(".carrito");
    cursos(CARRITO, array_cursos);
    precioTotal(CARRITO)

}

function cursos(contenedor, array_cursos){
    if (array_cursos.length === 0){
        const TITULO = document.createElement('h3');
        TITULO.classList.add("titulo-no-hay-cursos");
        TITULO.textContent = "NO SE ENCUENTRAN CURSOS CARGADOS";
        contenedor.appendChild(TITULO);
    }

    array_cursos.forEach(curso => {
        const templateCarrito = `
                <div class="carrito-item">
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
                </div>
                `
                contenedor.innerHTML += templateCarrito;
    });
}

function precioTotal(contenedor){
        const templatePrecioTotal = `<div id="carrito-precio-total">
                    <h2>TOTAL</h2>
                    <p>$ ${calcularTotal(CURSOS)}</p>
                    <div class="carrito-botones">
                        <a href="../pages/pago.html" id="confirmar-compra"><button>CONFIRMAR COMPRA</button></a>
                        <a href="../index.html"><button id="boton-cancelar">CANCELAR COMPRA</button></a>
                    </div>
                </div>  `

        contenedor.innerHTML += templatePrecioTotal;
        
        
        if (calcularTotal(CURSOS) === 0){
            const boton_confirmar = document.querySelector("#confirmar-compra");
            boton_confirmar.addEventListener('click', (event) => {
                event.preventDefault();
                alert("Cargue Cursos al Carrito para realizar la compra")
            });
        } 
        
}
function calcularTotal(cursos){
    let total = 0;
    cursos.forEach(curso => {
        total += curso.precio;
    })
    return total;
}