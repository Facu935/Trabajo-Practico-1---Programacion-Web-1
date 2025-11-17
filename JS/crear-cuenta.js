import { FORMULARIO_CREAR_CUENTA_INPUTS_LABELS } from "../constants/constants-crear-cuenta.js";
import { Usuario } from "./usuario.js";
import { localStorageUsuarios, limpiarLocalStorage } from "./funciones-generales.js";

mostrarFormulario(FORMULARIO_CREAR_CUENTA_INPUTS_LABELS);
//limpiarLocalStorage();



//MAQUETADO DE LA PAGINA
function mostrarFormulario(datos) {
    const CONTAINER_COMPLETO = document.querySelector(".login-container");
    const CONTAINER_FORMULARIO = document.createElement("div");
    CONTAINER_FORMULARIO.classList.add("login-form-container");

    const FORMULARIO = document.createElement("form");
    FORMULARIO.action = "./login.html" //METER VALIDACION
    FORMULARIO.method = "get"
    FORMULARIO.classList.add("login__form");
    FORMULARIO.id = "formulario";

    logoYNombre(FORMULARIO);
    tituloCrearCuenta(FORMULARIO);
    inputsFormulario(datos, FORMULARIO);
    terminosYCondiciones(FORMULARIO);
    botones(FORMULARIO);


    CONTAINER_FORMULARIO.appendChild(FORMULARIO);
    CONTAINER_COMPLETO.appendChild(CONTAINER_FORMULARIO);


    crearCuenta(FORMULARIO);


}


function logoYNombre(formulario) {
    const LOGO = document.createElement("div");
    const IMAGEN_LOGO = document.createElement("img");
    const TITULO_LOGO = document.createElement("span");
    LOGO.classList.add("logo-container");
    IMAGEN_LOGO.src = "../IMG/Logo TP.jpeg";
    IMAGEN_LOGO.alt = "Logo";
    IMAGEN_LOGO.classList.add("logo");
    TITULO_LOGO.classList.add("empresa-nombre");
    TITULO_LOGO.textContent = "Edu Courses";

    LOGO.appendChild(IMAGEN_LOGO);
    LOGO.appendChild(TITULO_LOGO);
    formulario.appendChild(LOGO);
}

function tituloCrearCuenta(formulario) {
    const TITULO_CREAR_CUENTA = document.createElement("h2");
    TITULO_CREAR_CUENTA.classList.add("titulo");
    TITULO_CREAR_CUENTA.textContent = "CREAR CUENTA";
    formulario.appendChild(TITULO_CREAR_CUENTA);
}

function inputsFormulario(datos, formulario) {
    const form_datos = document.createElement('div');
    datos.forEach(element => {
        const templateForm = `<label for="${element.label_for}" class="login__label">
                    ${element.titulo}
                    <input type="${element.input_type}" name="${element.input_name}" id="${element.input_id}" required placeholder="${element.placeholder}"
                        class="login__input">
                </label>`;
        form_datos.innerHTML += templateForm;
    });
    formulario.appendChild(form_datos);

    // 🔹 FORMATEO AUTOMÁTICO DEL TELÉFONO
    const telefonoInput = formulario.querySelector("#telefono"); // 🔹 buscar dentro del formulario
    if (telefonoInput) {
        telefonoInput.addEventListener("input", (e) => {
            let value = e.target.value.replace(/\D/g, "").substring(0, 8);
            if (value.length > 4) {
                value = value.substring(0, 4) + "-" + value.substring(4);
            }
            e.target.value = value;
        });
    }
}




function terminosYCondiciones(formulario) {
    const TERMINOS_Y_CONDICIONES = document.createElement("label");
    TERMINOS_Y_CONDICIONES.classList.add("terminos__label");
    const TERMINOS_CONTENIDO = `<input type="checkbox" name="acepto-terminos" required> Acepto los <a href="./terminos-condiciones.html" target="_blank">Términos y Condiciones</a>`
    TERMINOS_Y_CONDICIONES.innerHTML = TERMINOS_CONTENIDO;
    formulario.appendChild(TERMINOS_Y_CONDICIONES);
}

function botones(formulario) {
    const BOTONES = document.createElement("div");
    BOTONES.classList.add("boton-container");
    const BOTONES_CONTENIDO = `<a class="boton" href="./login.html">Volver</a><button type="submit" class="boton">Crear Cuenta</button>`
    BOTONES.innerHTML = BOTONES_CONTENIDO;
    formulario.appendChild(BOTONES);
}


//FUNCIONES DE LA PAGINA
function crearCuenta(formulario) {

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.querySelector("#username").value;
        const email = document.querySelector("#email").value;
        const telefono = document.querySelector("#telefono").value;
        const password = document.querySelector("#password").value;
        const confirmacionPassword = document.querySelector("#confirm-password").value;
        const aceptacionTerminos = document.getElementsByName("acepto-terminos")[0].checked;

        const errores = [];

        // Validación email
        if (validacionEmailNoRepetido(email)) {
            errores.push("El Email ya está asociado a una cuenta");
        }

        // Validación confirmación de contraseña
        if (!confirmacionDeClaves(password, confirmacionPassword)) {
            errores.push("Las contraseñas son distintas");
        }

        // Validación aceptación términos
        if (!validacionAceptarTerminos(aceptacionTerminos)) {
            errores.push("Debe aceptar los Términos y Condiciones");
        }

        // Validación contraseña
        const especiales = "!#$%&/()=?¿¡";
        const letras = password.replace(/[^A-Za-z]/g, "");
        const numeros = password.replace(/[^0-9]/g, "");
        const especialesPass = password.replace(new RegExp(`[^${especiales.replace(/[\!\$\%\&\/\(\)\=\?\¿\¡]/g, "\\$&")}]`, "g"), "");

        if (password.length < 8) errores.push("La contraseña al menos debe tener 8 caracteres");
        if (letras.length < 2) errores.push("La contraseña debe contener al menos 2 letras");
        if (numeros.length < 2) errores.push("La contraseña debe contener al menos 2 números");
        if (especialesPass.length < 2) errores.push(`La contraseña le falta alguno de los siguientes caracteres especiales: ${especiales}`);

        // Validación teléfono
        if (!/^\d{4}-\d{4}$/.test(telefono)) {
            errores.push('El número de teléfono debe tener el formato xxxx-xxxx');
        }

        // Mostrar errores si hay
        if (errores.length > 0) {
            alert(errores.join("\n"));
            return;
        }

        // Si pasa todas las validaciones
        const nuevoUsuario = new Usuario(username, email, telefono, password);
        nuevoUsuario.agregarUsuarioALocalStorage(nuevoUsuario);

        alert('Cuenta Creada con ÉXITO!!');
        event.target.submit();
    });

}



function validacionEmailNoRepetido(email_nuevo) {
    let repetido = false;

    localStorageUsuarios().forEach(usuario => {
        if (usuario.email === email_nuevo) {
            repetido = true;
        }
    });
    return repetido;
}

function confirmacionDeClaves(password1, password2) {
    let iguales = true;
    if (password1 !== password2) {
        iguales = false;
    }
    return iguales;
}

function validacionAceptarTerminos(checkbox) {
    let aceptado = true;
    if (checkbox === false) {
        aceptado = false;
    }
    return aceptado;
}



