import { validarUsuarioConectadoParaNav, obtenerUsuarioLogueado, limpiarUsuarioLogueado,
        guardarModificacionLocalStorage, guardarModificacionLocalStorageUsuarioLogueado,
        limpiarLocalStorage, localStorageUsuarios } from "./funciones-generales.js";


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

        }   
        
        //Contenedro Carrito
        const CARRITO_Y_NUMERO = document.createElement("div");
        CARRITO_Y_NUMERO.id = "carrito-y-numero";
        mostrarNumeroDelCarrito(CARRITO_Y_NUMERO);
        mostrarCarrito(CARRITO_Y_NUMERO);
        
        CONTENEDOR_CARRITO.appendChild(CARRITO_Y_NUMERO);
        HEADER.appendChild(CONTENEDOR_CARRITO);

        if(validarUsuarioConectadoParaNav()){
            mostrarOpcionesUsuarios();
        }
         
    }


}


function mostrarBotonLogin(contenedor_a_anexar){
        const LINK_LOGIN = document.createElement("a");
        LINK_LOGIN.href = "../pages/login.html";
        const BOTON_LOGIN = document.createElement("button");
        BOTON_LOGIN.id = "boton-login";
        BOTON_LOGIN.textContent = "Login";                     
        LINK_LOGIN.appendChild(BOTON_LOGIN);
        contenedor_a_anexar.appendChild(LINK_LOGIN);
}

export function mostrarNumeroDelCarrito(contenedor){
    const usuario_logueado = obtenerUsuarioLogueado();
    let totalCantidad = 0;

    if (usuario_logueado) {
        usuario_logueado.cursosEnCarrito.forEach(curso => {
            totalCantidad += (curso.cantidad || 0);
        });
    }

    // Buscar si ya existe el elemento contador; si no, lo creamos
    let NUMERO = contenedor.querySelector('#header-div__cantidad_items');
    if (!NUMERO) {
        NUMERO = document.createElement("div");
        NUMERO.id = "header-div__cantidad_items";
        contenedor.appendChild(NUMERO);

        // solo la primera vez asociamos el listener del sidebar
        modalCursosObtenidosEnCarrito(NUMERO, contenedor);
    }
    NUMERO.textContent = totalCantidad;
}


function modalCursosObtenidosEnCarrito(contador , contenedor){
    contador.addEventListener('click', () => {
        if (!validarUsuarioConectadoParaNav()) {
            window.location.href = "../pages/login.html";
            return;
        }
            const recuadro = document.querySelector(".sideBar-cursos-carrito")
                if (recuadro){
                recuadro.remove();
                return;
                }
                        let sideBarCursosEnCarrito = document.createElement("div");
                        sideBarCursosEnCarrito.classList.add("sideBar-cursos-carrito");
                        
                        const usuario_logueado = obtenerUsuarioLogueado();

                        if (!usuario_logueado){
                            window.location.href = "../pages/login.html";
                            return;
                        }

                        const cursosEnCarritoDelUsuario = usuario_logueado.cursosEnCarrito;
                            //Recorre Array y va creando los recuadros
                            for(let i = 0; i < cursosEnCarritoDelUsuario.length; i++ ){
                            const curso = cursosEnCarritoDelUsuario[i];
                            const templateCursos = `<div class="recuadro-curso-sidebar" id="recuadro-sidebar${i+1}"><div class="titulo-curso-sidebar">
                                                        <img src="${curso.img}" alt="Logo ${curso.nombre}" id="logo-curso-sidebar">
                                                        <h3>${curso.nombre}</h3>
                                                        </div>
                                                        <div class = "recuadro-curso-sidebar segundo-renglon">
                                                            <ul>
                                                                <li id="valoracion-curso-carrito">Valoracion:<img src="../IMG/Cursos/estrella.png" alt="" id> ${curso.valoracion}</li>
                                                                <li id="precio-curso-carrito">Precio: $ ${curso.precio}</li>
                                                                <li>Cantidad: ${curso.cantidad}</li>
                                                                <li>Modalidad: Virtual</li>
                                                            </ul>
                                                            <button class="boton-eliminar-curso-carrito" id="boton-eliminar${i+1}">Eliminar Curso</button>
                                                        </div>
                                                    </div>`
                                sideBarCursosEnCarrito.innerHTML += templateCursos; 
                            }

                            //Si no hay cursos
                            if (obtenerUsuarioLogueado().cursosEnCarrito.length === 0){
                                const TITULO_NO_HAY_CURSOS = document.createElement('h2');
                                TITULO_NO_HAY_CURSOS.textContent = "Todavía no se obtuvieron cursos";
                                sideBarCursosEnCarrito.appendChild(TITULO_NO_HAY_CURSOS);
                                
                            }
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

                        
                        eliminarCursoDelSideBar(cursosEnCarritoDelUsuario, contenedor);
                
        
    
    });
}
function eliminarCursoDelSideBar(cursosEnCarritoDelUsuario, contenedor){
  for (let i = 0; i < cursosEnCarritoDelUsuario.length; i++){
    const CURSO_A_BORRAR = document.querySelector("#recuadro-sidebar" + (i+1));
    const BOTON_ELIMINAR_CORRECTO = document.querySelector("#boton-eliminar" + (i+1));
    if (!BOTON_ELIMINAR_CORRECTO) continue;

    BOTON_ELIMINAR_CORRECTO.addEventListener('click', () => {
      // objeto del curso en el array (puede ser undefined si algo raro pasó)
      const cursoObj = cursosEnCarritoDelUsuario[i];

      if (!cursoObj) {
        // fallback: si no existe objeto, eliminamos DOM y splice
        if (CURSO_A_BORRAR) CURSO_A_BORRAR.remove();
        cursosEnCarritoDelUsuario.splice(i, 1);
      } else {
        const cantidadActual = cursoObj.cantidad;

        if (cantidadActual > 1) {
          // decrementar cantidad y actualizar la vista del sidebar
          cursoObj.cantidad = cantidadActual - 1;

          if (CURSO_A_BORRAR) {
            // buscamos el <li> que contiene "Cantidad:" y lo actualizamos
            const lis = CURSO_A_BORRAR.querySelectorAll('li');
            for (const li of lis) {
              if (li.textContent.trim().startsWith('Cantidad:')) {
                li.textContent = `Cantidad: ${cursoObj.cantidad}`;
                break;
              }
            }
          }
        } else {
          // cantidad === 1 -> eliminar el curso completamente
          if (CURSO_A_BORRAR) CURSO_A_BORRAR.remove();
          cursosEnCarritoDelUsuario.splice(i, 1);
        }
      }

      // CAMBIAR DATOS EN LS
      const usuario = obtenerUsuarioLogueado();
      usuario.cursosEnCarrito = cursosEnCarritoDelUsuario;

      copiaCursoUsuarioLogueadoALocalStorage(usuario);
      guardarModificacionLocalStorageUsuarioLogueado(usuario);

      // actualizar el contador (suma de cantidades)
      mostrarNumeroDelCarrito(contenedor);

      return;
    });
  }
}

function copiaCursoUsuarioLogueadoALocalStorage(usuario_logueado){
    const TODOS_LOS_USUARIOS = localStorageUsuarios();
    TODOS_LOS_USUARIOS.forEach(usuarioLS =>{
        if (usuario_logueado.email === usuarioLS.email){
            usuarioLS.cursosEnCarrito = usuario_logueado.cursosEnCarrito;
            return;
        }
    });
    guardarModificacionLocalStorage(TODOS_LOS_USUARIOS);
    
}



function mostrarCarrito(contenedor){
        const LINK_CARRITO = document.createElement("a");
        const BOTON_CARRITO = document.createElement("button");
        const IMAGEN_CARRITO = document.createElement("img");
        if (validarUsuarioConectadoParaNav()){
            LINK_CARRITO.href = "../pages/carrito.html";
        } else{
            LINK_CARRITO.href = "./pages/login.html";
        }
        BOTON_CARRITO.id = "button-carrito";
        IMAGEN_CARRITO.src = "../IMG/Icono Carrito de Compra.png";
        IMAGEN_CARRITO.alt = "Carrito de Compra";
        IMAGEN_CARRITO.id = "carrito";
        BOTON_CARRITO.appendChild(IMAGEN_CARRITO);
        LINK_CARRITO.appendChild(BOTON_CARRITO);
        contenedor.appendChild(LINK_CARRITO);

        /*
        // --- Añadir listener para que la imagen del carrito abra el mismo sidebar que el numerito ---
        BOTON_CARRITO.addEventListener('click', (e) => {
        e.preventDefault(); // evita navegar por el href
        // Aseguramos que el contador exista (si no, lo creamos)
        mostrarNumeroDelCarrito(contenedor);
        const NUMERO = document.querySelector('#header-div__cantidad_items');
        if (NUMERO) {
            // Disparar el click del numerito para reutilizar EXACTAMENTE el mismo comportamiento
            NUMERO.click();
        }
        });
        */
}



function mostrarBienvenidoUsuario(contenedor){
    
    const BIENVENIDO_USUARIO = document.createElement("a");
    BIENVENIDO_USUARIO.classList.add("nombre-usuario-logueado");
    BIENVENIDO_USUARIO.textContent = "Bienvenido, " + obtenerUsuarioLogueado().nombre;
    contenedor.appendChild(BIENVENIDO_USUARIO);
    //mostrarOpcionesUsuarios(BIENVENIDO_USUARIO);
}


function crearOpcionesUsuario(){
    const boton_bienvenido = document.querySelector(".nombre-usuario-logueado");
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
    boton_bienvenido.appendChild(contenedor_opciones);
    cerrarSesion();
}

function mostrarOpcionesUsuarios(){
    const boton_bienvenido = document.querySelector(".nombre-usuario-logueado");
     //El Bievenido
    boton_bienvenido.addEventListener('click', () => {
        
        //Se fija si ya existe, si esta lo elimina, si no, lo crea con el metodo
        const yaExistente = document.querySelector(".contenedor-opciones-cuenta");
        if (yaExistente){
            yaExistente.remove();
            return;
        } else {
            crearOpcionesUsuario();
        }

        
    });
}

function cerrarSesion(){
    const opcion_cerrar_Sesion = document.querySelector("#cerrar-sesion")

    opcion_cerrar_Sesion.addEventListener('click', () => {
        limpiarUsuarioLogueado();
    });
}


