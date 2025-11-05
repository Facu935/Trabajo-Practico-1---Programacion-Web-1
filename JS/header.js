import { validarUsuarioConectadoParaNav, obtenerUsuarioLogueado } from "./funciones-generales.js";


export class Header{

    constructor(){
    }

    mostrarHeader(cursos){
        this.logo();
        this.buscador(cursos);
        this.loginYCarrito()
    }

    logo(){
    const HEADER = document.querySelector("#inicio");

    const CONTENEDOR_LOGO = document.createElement("div");
    CONTENEDOR_LOGO.classList.add("header-div__logo");

    const IMAGEN =  document.createElement("img");
    IMAGEN.src = "IMG/Logo TP.jpeg";
    IMAGEN.alt = "Logo de la Empresa";
    IMAGEN.id = "logo";

    CONTENEDOR_LOGO.appendChild(IMAGEN);
    HEADER.appendChild(CONTENEDOR_LOGO);    
    }
    buscador(cursos){
    const HEADER = document.querySelector("#inicio");
    const CONTENEDOR_LINKS_BUSCADOR = document.createElement("div");
    CONTENEDOR_LINKS_BUSCADOR.classList.add("buscador-links")
    const ETIQUETA_DETAILS = document.createElement("details");
    const BUSCADOR = document.createElement("summary");
    BUSCADOR.textContent = "Buscar Curso";
    const LISTA_CURSOS = document.createElement("ul");

    cursos.forEach(curso => {
        const templateCursos = `<li><a href="${curso.link}">${curso.nombre}</a></li>`
        LISTA_CURSOS.innerHTML += templateCursos;
    });

    ETIQUETA_DETAILS.appendChild(BUSCADOR);
    ETIQUETA_DETAILS.appendChild(LISTA_CURSOS);
    CONTENEDOR_LINKS_BUSCADOR.appendChild(ETIQUETA_DETAILS);
    HEADER.appendChild(CONTENEDOR_LINKS_BUSCADOR);
    }
    loginYCarrito(){
        const HEADER = document.querySelector("#inicio");
        const CONTENEDOR_CARRITO = document.createElement("div");
        CONTENEDOR_CARRITO.classList.add("header-div__carrito");

        //METER UN IF DE USUARIO LOGUEADO O NO
            //Si no esta logueado
        
         
        if (!validarUsuarioConectadoParaNav()){
            mostrarBotonLogin(CONTENEDOR_CARRITO);
        } else {
            mostrarNombreUsuarioLogueado(CONTENEDOR_CARRITO);

        }   
        

        //Contenedro Carrito
        const CARRITO_Y_NUMERO = document.createElement("div");
        CARRITO_Y_NUMERO.id = "carrito-y-numero";
        mostrarNumeroDelCarrito(CARRITO_Y_NUMERO);
        mostrarCarrito(CARRITO_Y_NUMERO);
        //Falta hacer la funcion que muestre el numero de items en el carrito según el usuario logueado actual
        

        CONTENEDOR_CARRITO.appendChild(CARRITO_Y_NUMERO);
        HEADER.appendChild(CONTENEDOR_CARRITO);

        //Funciones
        mostrarOpcionesPerfilYCerrarSesion();

    }


}


function mostrarBotonLogin(contenedor_a_anexar){
        const LINK_LOGIN = document.createElement("a");
        LINK_LOGIN.href = "./pages/login.html";
        const BOTON_LOGIN = document.createElement("button");
        BOTON_LOGIN.id = "boton-login";
        BOTON_LOGIN.textContent = "Login";                      //CAMBIAR SI ESTA LOGUEADO
        LINK_LOGIN.appendChild(BOTON_LOGIN);
        contenedor_a_anexar.appendChild(LINK_LOGIN);
}

function mostrarNumeroDelCarrito(contenedor){
        const NUMERO = document.createElement("div");
        NUMERO.id = "header-div__cantidad_items";
        NUMERO.textContent = "0";                       //Aca meter funcion en base a los cursos que tenga el usuario
        contenedor.appendChild(NUMERO);


}

function mostrarCarrito(contenedor){
        const LINK_CARRITO = document.createElement("a");
        const BOTON_CARRITO = document.createElement("button");
        const IMAGEN_CARRITO = document.createElement("img");
        LINK_CARRITO.href = "./pages/login.html";                   //VALIDAR SI USUARIO ESTA CONECTADO
        BOTON_CARRITO.id = "button-carrito";
        IMAGEN_CARRITO.src = "IMG/Icono Carrito de Compra.png";
        IMAGEN_CARRITO.alt = "Carrito de Compra";
        IMAGEN_CARRITO.id = "carrito";
        BOTON_CARRITO.appendChild(IMAGEN_CARRITO);
        LINK_CARRITO.appendChild(BOTON_CARRITO);
        contenedor.appendChild(LINK_CARRITO);
}


function mostrarNombreUsuarioLogueado(contenedor){
    
    const NOMBRE_USUARIO = document.createElement("a");
    NOMBRE_USUARIO.classList.add("nombre-usuario-logueado");
    NOMBRE_USUARIO.textContent = "Bienvenido, " + obtenerUsuarioLogueado().nombre;
    contenedor.appendChild(NOMBRE_USUARIO);

    

}

function mostrarOpcionesPerfilYCerrarSesion(){
    const boton = document.querySelector(".nombre-usuario-logueado");

    boton.addEventListener("click", (event)=>{
        event.preventDefault();
        creacionOpciones(boton);

    });
}

function creacionOpciones(boton){
        const opciones_contenedor = document.createElement("div");
        opciones_contenedor.classList.add("contendor-opciones-usuario");
        const opciones = document.createElement("ul");

        miPerfil(opciones);          //Hacer pagina perfil
        cerrarSesion(opciones);     //Poner Funcionalidad de limpiar usuario logueado y refrescar pagina


        opciones_contenedor.appendChild(opciones);
        boton.appendChild(opciones_contenedor);
}

function miPerfil(contenedor_anexo){
        const opcion_perfil = document.createElement("li");
        const link_perfil = document.createElement("a");
        link_perfil.href = "./pages/perfil.html";  
        link_perfil.textContent = "Mi Perfil";
        opcion_perfil.appendChild(link_perfil);
        contenedor_anexo.appendChild(opcion_perfil);
}
function cerrarSesion(contenedor_anexo){
        const opcion_cerrar_sesion = document.createElement("li");
        const link_cerrar_sesion = document.createElement("a");
        link_cerrar_sesion.href = "#";          
        link_cerrar_sesion.textContent = "Cerrar Sesión";
        opcion_cerrar_sesion.appendChild(link_cerrar_sesion);
        contenedor_anexo.appendChild(opcion_cerrar_sesion);
}