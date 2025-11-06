import { validarUsuarioConectadoParaNav, obtenerUsuarioLogueado, limpiarUsuarioLogueado, } from "./funciones-generales.js";

//localStorage.clear();

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
    IMAGEN.src = "../IMG/Logo TP.jpeg";
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


        
        
        if (!validarUsuarioConectadoParaNav()){
            mostrarBotonLogin(CONTENEDOR_CARRITO);
        } else {
            mostrarBienvenidoUsuario(CONTENEDOR_CARRITO);
            mostrarOpcionesUsuarios(CONTENEDOR_CARRITO);
        }   
        


        //Contenedro Carrito
        const CARRITO_Y_NUMERO = document.createElement("div");
        CARRITO_Y_NUMERO.id = "carrito-y-numero";
        mostrarNumeroDelCarrito(CARRITO_Y_NUMERO);
        mostrarCarrito(CARRITO_Y_NUMERO);
        
        
        
        CONTENEDOR_CARRITO.appendChild(CARRITO_Y_NUMERO);
        HEADER.appendChild(CONTENEDOR_CARRITO);


    }


}


function mostrarBotonLogin(contenedor_a_anexar){
        const LINK_LOGIN = document.createElement("a");
        LINK_LOGIN.href = "../pages/login.html";
        const BOTON_LOGIN = document.createElement("button");
        BOTON_LOGIN.id = "boton-login";
        BOTON_LOGIN.textContent = "Login";                      //CAMBIAR SI ESTA LOGUEADO
        LINK_LOGIN.appendChild(BOTON_LOGIN);
        contenedor_a_anexar.appendChild(LINK_LOGIN);
}

function mostrarNumeroDelCarrito(contenedor){
        const usuario_logueado = obtenerUsuarioLogueado();
        let cantidadDeCursos = 0;

        if (usuario_logueado !== null && usuario_logueado !== undefined){
            cantidadDeCursos = usuario_logueado.cursosEnCarrito.length;
        }
        
        const NUMERO = document.createElement("div");
        NUMERO.id = "header-div__cantidad_items";
        NUMERO.textContent = cantidadDeCursos;             
        contenedor.appendChild(NUMERO);

        
        modalCursosObtenidosEnCarrito(NUMERO, contenedor);

        

}

//Cambiar modalidad y cantidad de cursos
//Agregar Evento para eliminar el curso del carrito
function modalCursosObtenidosEnCarrito(contador , contenedor){


    contador.addEventListener('click', () => {
        
//Arreglar esto para que desaparezca al tocar el numero, auqne tenga el Cerrar
        const recuadro = document.querySelector(".sideBar-cursos-carrito")
            if (recuadro){
            sideBarCursosEnCarrito.remove();
            return;
            } else {
                let sideBarCursosEnCarrito = document.createElement("div");
                sideBarCursosEnCarrito.classList.add("sideBar-cursos-carrito");
                
                
                //Grilla Con Cursos
                const usuario_logueado = obtenerUsuarioLogueado();
                const cursosEnCarritoDelUsuario = usuario_logueado.cursosEnCarrito;
                    //Recorre Array y va creando los recuadros
                cursosEnCarritoDelUsuario.forEach(curso => {
                    const templateCursos = `<div class="recuadro-curso-sidebar">
                                                <h3>${curso.nombre}</h3>
                                                <div class = "recuadro-curso-sidebar segundo-renglon">
                                                    <ul>
                                                        <li>${curso.nombre}</li>
                                                        <li>(Cantidad)</li>
                                                        <li>(Modalidad)</li>
                                                    </ul>
                                                    <button class="boton-eliminar-curso-carrito">Eliminar Curso</button>
                                                </div>
                                            </div>`
                        sideBarCursosEnCarrito.innerHTML += templateCursos;                 
                });
                //Añadir Evento de eliminar curso del carrito aca


                
                //Boton Cerrar
                const boton_cerrar_sideBar = document.createElement("button")
                boton_cerrar_sideBar.classList.add("boton-cerrar-sideBar");
                boton_cerrar_sideBar.textContent = "Cerrar";
                    boton_cerrar_sideBar.addEventListener('click', () =>{
                        sideBarCursosEnCarrito.remove();
                    });
                //Anexos
                sideBarCursosEnCarrito.appendChild(boton_cerrar_sideBar);
                contenedor.appendChild(sideBarCursosEnCarrito);
        }    
    });
}


function botonBorrarCursoDelCarrito(){
    
}


function mostrarCarrito(contenedor){
        const LINK_CARRITO = document.createElement("a");
        const BOTON_CARRITO = document.createElement("button");
        const IMAGEN_CARRITO = document.createElement("img");
        LINK_CARRITO.href = "./pages/login.html";                   //VALIDAR SI USUARIO ESTA CONECTADO
        BOTON_CARRITO.id = "button-carrito";
        IMAGEN_CARRITO.src = "../IMG/Icono Carrito de Compra.png";
        IMAGEN_CARRITO.alt = "Carrito de Compra";
        IMAGEN_CARRITO.id = "carrito";
        BOTON_CARRITO.appendChild(IMAGEN_CARRITO);
        LINK_CARRITO.appendChild(BOTON_CARRITO);
        contenedor.appendChild(LINK_CARRITO);
}



function mostrarBienvenidoUsuario(contenedor){
    
    const BIENVENIDO_USUARIO = document.createElement("a");
    BIENVENIDO_USUARIO.classList.add("nombre-usuario-logueado");
    BIENVENIDO_USUARIO.textContent = "Bienvenido, " + obtenerUsuarioLogueado().nombre;
    contenedor.appendChild(BIENVENIDO_USUARIO);
    
}


function crearOpcionesUsuario(contenedor_general){

    const contenedor_opciones = document.createElement('div');
    contenedor_opciones.classList.add("contenedor-opciones-cuenta");
    const templateOpciones =
        `
        <ul class ="lista-opciones-cuenta">
            <li><a href="/pages/perfil.html" id="perfil">Mi Perfil</a></li>
            <li><a href="/index.html" id="cerrar-sesion">Cerrar Sesion</a></li>
        </ul>
        
        `;
    contenedor_opciones.innerHTML = templateOpciones;
    contenedor_general.appendChild(contenedor_opciones);
    cerrarSesion();
}

function mostrarOpcionesUsuarios(contenedor_general){
    const boton_bienvenido = contenedor_general.querySelector(".nombre-usuario-logueado") //El Bievenido
    boton_bienvenido.addEventListener('click', () => {
        
        //Se fija si ya existe, si esta lo elimina, si no, lo crea con el metodo
        const yaExistente = document.querySelector(".contenedor-opciones-cuenta");
        if (yaExistente){
            yaExistente.remove();
            return;
        } else {
            crearOpcionesUsuario(contenedor_general)
        }

        
    });
}

function cerrarSesion(){
    const opcion_cerrar_Sesion = document.querySelector("#cerrar-sesion")

    opcion_cerrar_Sesion.addEventListener('click', () => {
        limpiarUsuarioLogueado();
    });
}

