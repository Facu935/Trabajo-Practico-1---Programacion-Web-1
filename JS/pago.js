import { guardarModificacionLocalStorage, guardarModificacionLocalStorageUsuarioLogueado, localStorageUsuarios, obtenerUsuarioLogueado } from "./funciones-generales.js";

const SECTION = document.querySelector(".pago");
const CURSOS_USUARIO = obtenerUsuarioLogueado().cursosEnCarrito;

datosTarjeta(SECTION);
resumen(SECTION, CURSOS_USUARIO);
confirmarCompra();

function datosTarjeta(section) {
    const templateTarjeta = `<div class="pago-metodo">
                <h2>PAGO</h2>
                <form action="../index.html" method="get" id="pago">
                    <div id="tarjeta">
                        <label for="numero-tarjeta">Numero de Tarjeta <span id="asterisco">*</span></label>
                        <input type="text" id="numero-tarjeta" name="numero-tarjeta"
                        placeholder="Ej: 9999 9999 9999 9999" maxlength="19" >
                    </div>

                    <div id="vencimiento-seguridad">
                        <label for="vencimiento">Fecha de Vencimiento <span id="asterisco">*</span></label>
                        <input type="text" id="vencimiento" name="vencimiento" placeholder="MM/AA" maxlength="5" >
                        <label for="codigo-seguridad">Codigo de Seguridad <span id="asterisco">*</span></label>
                        <input type="text" id="codigo-seguridad" maxlength="3" placeholder="CVV" >
                    </div>
                    <div id="nombre-apellido-titular">
                        <label for="titular">Nombre y Apellido del titular <span id="asterisco">*</span></label>
                        <input type="text" id="titular" name="titular" placeholder="Nicolás Gomez" >
                    </div>
                    <button type="submit">Confirmar Compra</button>
                </form>
                <div class="boton-cancelar">
                    <a href="../index.html"><button id="cancelar">Cancelar</button></a>
                </div>
            </div>`

    section.innerHTML += templateTarjeta;

    const numeroInput = document.querySelector("#numero-tarjeta");
    numeroInput.addEventListener("input", (e) => {
        let valor = e.target.value.replace(/\D/g, '').slice(0, 16); 
        valor = valor.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = valor;
    });

    const vencimientoInput = document.querySelector("#vencimiento");
    vencimientoInput.addEventListener("input", (e) => {
        let valor = e.target.value.replace(/\D/g, '').slice(0, 4);
        if (valor.length >= 3) {
            valor = valor.slice(0, 2) + '/' + valor.slice(2);
        }
        e.target.value = valor;
    });

    const cvvInput = document.querySelector("#codigo-seguridad");
    cvvInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
    });
}

function resumen(section, cursos) {
    const CONTENEDOR_DATOS = document.querySelector(".pago-resumen-datos");

    cursos.forEach(curso => {
        const templateResumen = `
                    <div id="detalle-curso">
                        <h4>Curso ${curso.nombre}</h4>
                        <p>$ ${curso.precio} (X ${curso.cantidad})</p>
                    </div>`
        CONTENEDOR_DATOS.innerHTML += templateResumen;
    });

    const templatePrecioTotal = `<div id="total">
                        <h4>Total:</h4>
                        <p>$ ${calcularTotal(cursos)}</p>
                    </div>`
    CONTENEDOR_DATOS.innerHTML += templatePrecioTotal;
}

function calcularTotal(cursos) {
    let total = 0;
    cursos.forEach(curso => {
        const cantidad = curso.cantidad;
        const precio = curso.precio;
        total += precio * cantidad;
    });
    return total;
}

function confirmarCompra() {
    const FORM = document.querySelector("#pago");
    FORM.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!validacionTarjeta()) {
            return;
        } else {
            alert("Compra confirmada");
            agregarCursosDelCarritoAlPerfil();
            window.location.href = "../index.html";
        }
    });
}

function validacionTarjeta() {
    const NUMERO = document.querySelector("#numero-tarjeta").value.replace(/\s/g, '');
    const FECHA_DE_VENCIMIENTO = document.querySelector("#vencimiento").value;
    const CODIGO_SEGURIDAD = document.querySelector("#codigo-seguridad").value;
    const NOMBRE_APELLIDO_TITULAR = document.querySelector("#titular").value;

    if (NUMERO.length !== 16) {
        alert("ERROR al comprobar numero de tarjeta, debe tener 16 DIGITOS");
        return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(FECHA_DE_VENCIMIENTO)) {
        alert("Ingrese Fecha de Vencimiento válida MM/AA");
        return false;
    }

    const [mes, anio] = FECHA_DE_VENCIMIENTO.split("/").map(Number);
    if (mes < 1 || mes > 12) {
        alert("Mes de vencimiento inválido. Debe ser entre 01 y 12");
        return false;
    }

    if (CODIGO_SEGURIDAD.length !== 3) {
        alert("ERROR al comprobar codigo de seguridad, debe tener 3 DIGITOS");
        return false;
    }

    // Validar nombre titular solo letras y espacios
    if (!NOMBRE_APELLIDO_TITULAR || !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(NOMBRE_APELLIDO_TITULAR)) {
        alert("ERROR al comprobar titular de la tarjeta, solo puede contener letras y espacios, no debe estar vacío");
        return false;
    }

    return true;
}


function agregarCursosDelCarritoAlPerfil() {
    const USUARIO = obtenerUsuarioLogueado();
    const USUARIOS_REGISTRADOS = localStorageUsuarios();

    //Pushea los Cursos de carrito a Cursos Inscriptos del usuario logueado
    for (let i = 0; i < USUARIO.cursosEnCarrito.length; i++) {
        const curso = USUARIO.cursosEnCarrito[i];
        USUARIO.cursosInscriptos.push(curso);
    }

    //Elimina los cursos del carrito
    USUARIO.cursosEnCarrito = [];

    //Modificamos usuario en la base de LS
    for (let i = 0; i < USUARIOS_REGISTRADOS.length; i++) {
        if (USUARIO.email === USUARIOS_REGISTRADOS[i].email) {
            //Push los cursos INSCRIPTOS al registro del usuario en LS
            for (let j = 0; j < USUARIO.cursosInscriptos.length; j++) {
                USUARIOS_REGISTRADOS[i].cursosInscriptos.push(USUARIO.cursosInscriptos[j]);
            }
            //Guardo modificaciones en JSON de LS tanto para los 2 tipos de clave y salgo del if para que continue y termine ejecucion
            guardarModificacionLocalStorageUsuarioLogueado(USUARIO);
            guardarModificacionLocalStorage(USUARIOS_REGISTRADOS);
            return;
        }
    }



}