import { obtenerUsuarioLogueado } from "./funciones-generales.js";

const SECTION = document.querySelector(".pago");
const CURSOS_USUARIO = obtenerUsuarioLogueado().cursosEnCarrito;

datosTarjeta(SECTION);
resumen(SECTION, CURSOS_USUARIO);

const NUMERO_DE_TARJETA = document.querySelector("#numero-tarjeta").value;
const FECHA_DE_VENCIMIENTO = document.querySelector("#vencimiento").value;
const CODIGO_SEGURIDAD = document.querySelector("#codigo-seguridad").value;
const NOMBRE_APELLIDO_TITULAR = document.querySelector("#titular").value;

function datosTarjeta(section){
    const templateTarjeta = `<div class="pago-metodo">
                <h2>PAGO</h2>
                <form action="../pages/confirmacion-compra.html" method="get">
                    <div id="tarjeta">
                        <label for="numero-tarjeta">Numero de Tarjeta <span id="asterisco">*</span></label>
                        <input type="number" id="numero-tarjeta" name="numero-tarjeta"
                        placeholder="Ej: 9999 9999 9999 9999" maxlength="16" required>
                    </div>


                    <div id="vencimiento-seguridad">
                        <label for="vencimiento">Fecha de Vencimiento <span id="asterisco">*</span></label>
                        <input type="date" id="vencimiento" name="vencimiento" required>
                        <label for="codigo-seguridad">Codigo de Seguridad <span id="asterisco">*</span></label>
                        <input type="number" id="codigo-seguridad" maxlength="3" placeholder="CVV" required>
                    </div>
                    <div id="nombre-apellido-titular">
                        <label for="titular">Nombre y Apellido del titular <span id="asterisco">*</span></label>
                        <input type="text" id="titular" name="titular" placeholder="Nicolás Gomez" required>
                    </div>
                    <button type="submit">Confirmar Compra</button>
                </form>
                <div class="boton-cancelar">
                    <a href="../index.html"><button id="cancelar">Cancelar</button></a>
                </div>
            </div>`

    section.innerHTML += templateTarjeta;
}

function resumen(section, cursos){


    const CONTENEDOR_DATOS = document.querySelector(".pago-resumen-datos");

    cursos.forEach(curso => {
            const templateResumen = `
                    <div id="detalle-curso">
                        <h4>Curso ${curso.nombre}</h4>
                        <p>$ ${curso.precio}</p>
                    </div>`
            CONTENEDOR_DATOS.innerHTML += templateResumen;
    });

    //Total
    const templatePrecioTotal= `<div id="total">
                        <h4>Total:</h4>
                        <p>$ ${calcularTotal(cursos)}</p>
                    </div>`
    CONTENEDOR_DATOS.innerHTML += templatePrecioTotal;
}

function calcularTotal(cursos){
    let total = 0;
    cursos.forEach(curso => {
        total += curso.precio;
    })
    return total;
}

