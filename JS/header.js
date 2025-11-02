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

        //Boton Login
        const LINK_LOGIN = document.createElement("a");
        LINK_LOGIN.href = "./pages/login.html";
        const BOTON_LOGIN = document.createElement("button");
        BOTON_LOGIN.id = "boton-login";
        BOTON_LOGIN.textContent = "Login";                      //CAMBIAR SI ESTA LOGUEADO
        LINK_LOGIN.appendChild(BOTON_LOGIN);
        CONTENEDOR_CARRITO.appendChild(LINK_LOGIN);

        //Carrito
            //Contenedor
        const CARRITO_Y_NUMERO = document.createElement("div");
        CARRITO_Y_NUMERO.id = "carrito-y-numero";
            //Numero
        const NUMERO = document.createElement("div");
        NUMERO.id = "header-div__cantidad_items";
        NUMERO.textContent = "0";                       //Aca meter funcion en base a los cursos que tenga el usuario
        CARRITO_Y_NUMERO.appendChild(NUMERO);

            //Imagen Carrito
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
        CARRITO_Y_NUMERO.appendChild(LINK_CARRITO);



        CONTENEDOR_CARRITO.appendChild(CARRITO_Y_NUMERO);
        HEADER.appendChild(CONTENEDOR_CARRITO);
    }


}





