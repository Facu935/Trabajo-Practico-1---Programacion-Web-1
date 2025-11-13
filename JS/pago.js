import { guardarModificacionLocalStorage, guardarModificacionLocalStorageUsuarioLogueado, localStorageUsuarios, obtenerUsuarioLogueado } from "./funciones-generales.js";

const SECTION = document.querySelector(".pago");
const CURSOS_USUARIO = obtenerUsuarioLogueado().cursosEnCarrito;

datosTarjeta(SECTION);
resumen(SECTION, CURSOS_USUARIO);
confirmarCompra();


function datosTarjeta(section){
    const templateTarjeta = `<div class="pago-metodo">
                <h2>PAGO</h2>
                <form action="../index.html" method="get" id="pago">
                    <div id="tarjeta">
                        <label for="numero-tarjeta">Numero de Tarjeta <span id="asterisco">*</span></label>
                        <input type="number" id="numero-tarjeta" name="numero-tarjeta"
                        placeholder="Ej: 9999 9999 9999 9999" maxlength="16" >
                    </div>


                    <div id="vencimiento-seguridad">
                        <label for="vencimiento">Fecha de Vencimiento <span id="asterisco">*</span></label>
                        <input type="date" id="vencimiento" name="vencimiento" >
                        <label for="codigo-seguridad">Codigo de Seguridad <span id="asterisco">*</span></label>
                        <input type="number" id="codigo-seguridad" maxlength="3" placeholder="CVV" >
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
}

function resumen(section, cursos){
    const CONTENEDOR_DATOS = document.querySelector(".pago-resumen-datos");

    cursos.forEach(curso => {
            const templateResumen = `
                    <div id="detalle-curso">
                        <h4>Curso ${curso.nombre}</h4>
                        <p>$ ${curso.precio} (X ${curso.cantidad})</p>
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
        const cantidad = curso.cantidad;
        const precio = curso.precio;
        total += precio * cantidad;
    });
    return total;
}

function confirmarCompra(){
    const FORM = document.querySelector("#pago");
    FORM.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!validacionTarjeta()){
            return;
        } else {
            alert("Compra confirmada");
            agregarCursosDelCarritoAlPerfil();
            window.location.href = "../index.html";
        }
    });
        
    
}

function validacionTarjeta(){
    const NUMERO = document.querySelector("#numero-tarjeta").value.trim();
    const NUMERO_DE_TARJETA = NUMERO.replace(/\D/g, "");
    //Expresion regular: elimina todos lo que sea caracteres no numericos (\D), y lo aplica todas las veces que ocurre (g)    
    const FECHA_DE_VENCIMIENTO = document.querySelector("#vencimiento").value;
    const CODIGO_SEGURIDAD = document.querySelector("#codigo-seguridad").value;
    const NOMBRE_APELLIDO_TITULAR = document.querySelector("#titular").value;

    let bandera = true;
    if (NUMERO_DE_TARJETA < 16){
        bandera = false;
        alert("ERROR al comprobar numero de tarjeta");
    }
    if (!FECHA_DE_VENCIMIENTO){
        bandera = false;
        alert("Ingrese Fecha de Vencimiento");
    }
    if(CODIGO_SEGURIDAD.length !== 3){
        bandera = false;
        alert("ERROR al comprobar codigo de seguridad");
    }
    if ( !NOMBRE_APELLIDO_TITULAR || /\d/.test(NOMBRE_APELLIDO_TITULAR)){ //Se fija si tiene un numero, que no deberia
        bandera = false;
        alert("ERROR al comprobar titular de la tarjeta");
    }
    return bandera;
}

function agregarCursosDelCarritoAlPerfil(){
    const USUARIO = obtenerUsuarioLogueado();
    const USUARIOS_REGISTRADOS = localStorageUsuarios();
    
    //Pushea los Cursos de carrito a Cursos Inscriptos del usuario logueado
    for (let i  = 0; i < USUARIO.cursosEnCarrito.length; i++){
        const curso = USUARIO.cursosEnCarrito[i];
        USUARIO.cursosInscriptos.push(curso);
    }

    //Elimina los cursos del carrito
    USUARIO.cursosEnCarrito = [];

    //Modificamos usuario en la base de LS
    for (let i  = 0; i < USUARIOS_REGISTRADOS.length; i++){
        if (USUARIO.email === USUARIOS_REGISTRADOS[i].email){
            //Push los cursos INSCRIPTOS al registro del usuario en LS
            for (let j = 0; j < USUARIO.cursosInscriptos.length; j++){
                USUARIOS_REGISTRADOS[i].cursosInscriptos.push(USUARIO.cursosInscriptos[j]);
            }
            //Guardo modificaciones en JSON de LS tanto para los 2 tipos de clave y salgo del if para que continue y termine ejecucion
            guardarModificacionLocalStorageUsuarioLogueado(USUARIO);
            guardarModificacionLocalStorage(USUARIOS_REGISTRADOS);
            return;
        }
    }
    
    

}