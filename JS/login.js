import { guardarModificacionLocalStorage, localStorageUsuarios, usuarioLogueado } from "./funciones-generales.js";

mostrarLogin();

function mostrarLogin(){
    const CONTAINER_COMPLETO = document.querySelector(".login-container");
    const CONTAINER_LOGIN= document.createElement("div");
    CONTAINER_LOGIN.classList.add("login-form-container");
    
    const LOGIN = document.createElement("form");
    LOGIN.action = "../index.html"
    LOGIN.method = "get"                                
    LOGIN.classList.add("login__form");
    LOGIN.id = "login";

    logoYNombre(LOGIN);
    tituloCrearCuenta(LOGIN);
    loginInputs(LOGIN);
    botones(LOGIN);
    

    CONTAINER_LOGIN.appendChild(LOGIN);
    CONTAINER_COMPLETO.appendChild(CONTAINER_LOGIN);

    validacionUsuarioYPassword()

}

function logoYNombre(login){
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
    login.appendChild(LOGO);
}

function tituloCrearCuenta(login){
    const TITULO_LOGIN = document.createElement("h2");
    TITULO_LOGIN.classList.add("titulo");
    TITULO_LOGIN.textContent = "INICIAR SESIÓN";
    login.appendChild(TITULO_LOGIN);
}

function loginInputs(login){
        const login_input = document.createElement('div');
    const templateLogin = `<label for="username" class="login__label">
                    *Correo Electrónico:
                    <input type="email" name="email" id="email" required placeholder="E-mail"
                        class="login__input">
                </label>
                <label for="password" class="contacto__label">
                    *Contraseña:
                    <input type="password" name="password" id="password" required placeholder="Contraseña"
                        class="login__input">
                </label>`
    login_input.innerHTML = templateLogin;
    login.appendChild(login_input);
}

function botones(login){
    const BOTONES = document.createElement("div");
    BOTONES.classList.add("boton-container");
    const BOTONES_CONTENIDO = `<a class="boton" href="./crear-cuenta.html">No tengo cuenta</a><button class="boton" href="../index.html">Iniciar Sesion</button>`
    BOTONES.innerHTML = BOTONES_CONTENIDO;
    login.appendChild(BOTONES);
}

function validacionUsuarioYPassword(){
    const INICIAR_SESION = document.querySelector("#login");

    INICIAR_SESION.addEventListener('submit',event => {
        event.preventDefault();
        const username = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const usuarios = localStorageUsuarios();
        let bandera = false;

        usuarios.forEach(element => {
            if (username === element.email && password === element.password){
                bandera = true;
                element.logueado = true;
                guardarModificacionLocalStorage(usuarios);
                usuarioLogueado(usuarios);
                event.target.submit();
            }
        });

        if(!bandera){
            alert("Usuario o Contraseña INCORRECTA!!")
        }
    });  
}