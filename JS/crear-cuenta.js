import { FORMULARIO_CREAR_CUENTA_INPUTS_LABELS } from "../constants/constants-crear-cuenta.js";

mostrarFormulario(FORMULARIO_CREAR_CUENTA_INPUTS_LABELS);





function mostrarFormulario(datos){
    const CONTAINER_COMPLETO = document.querySelector(".login-container");
    const CONTAINER_FORMULARIO = document.createElement("div");
    CONTAINER_FORMULARIO.classList.add("login-form-container");

    const FORMULARIO = document.createElement("form");
    FORMULARIO.action = "./confirmacion-crear-cuenta.html" //METER VALIDACION
    FORMULARIO.method = "get"                              //Cambiar a POST???   
    FORMULARIO.classList.add("login__form");

    logoYNombre(FORMULARIO);
    tituloCrearCuenta(FORMULARIO);
    inputsFormulario(datos, FORMULARIO);
    terminosYCondiciones(FORMULARIO);
    botones(FORMULARIO);
    

    CONTAINER_FORMULARIO.appendChild(FORMULARIO);
    CONTAINER_COMPLETO.appendChild(CONTAINER_FORMULARIO);
}


function logoYNombre(formulario){
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

function tituloCrearCuenta(formulario){
    const TITULO_CREAR_CUENTA = document.createElement("h2");
    TITULO_CREAR_CUENTA.classList.add("titulo");
    TITULO_CREAR_CUENTA.textContent = "CREAR CUENTA";
    formulario.appendChild(TITULO_CREAR_CUENTA);
}

function inputsFormulario(datos, formulario){
    const form_datos = document.createElement('div');
    datos.forEach(element => {
        const templateForm = `<label for="${element.label_for}" class="login__label">
                    ${element.titulo}
                    <input type="${element.input_type}" name="${element.input_name}" id="${element.input_id}" required placeholder="${element.placeholder}"
                        class="login__input">
                </label>`
        form_datos.innerHTML += templateForm;
    });
    formulario.appendChild(form_datos);
}


function terminosYCondiciones(formulario){
    const TERMINOS_Y_CONDICIONES = document.createElement("label");
    TERMINOS_Y_CONDICIONES.classList.add("terminos__label");
    const TERMINOS_CONTENIDO = `<input type="checkbox" name="acepto-terminos" required> Acepto los <a href="./terminos-condiciones.html" target="_blank">Términos y Condiciones</a>`
    TERMINOS_Y_CONDICIONES.innerHTML = TERMINOS_CONTENIDO;
    formulario.appendChild(TERMINOS_Y_CONDICIONES);
}

function botones(formulario){
    const BOTONES = document.createElement("div");
    BOTONES.classList.add("boton-container");
    const BOTONES_CONTENIDO = `<a class="boton" href="./login.html">Volver</a><button type="submit" class="boton">Crear Cuenta</button>`
    BOTONES.innerHTML = BOTONES_CONTENIDO;
    formulario.appendChild(BOTONES);
}

