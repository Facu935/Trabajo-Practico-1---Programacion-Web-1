export class Footer {
    constructor(){
    }

mostrarIntegrantes(intergrantes){
    const FOOTER = document.querySelector("#footer");
    const CONTENEDOR_INTEGRANTES = document.createElement('div');
    CONTENEDOR_INTEGRANTES.classList.add("footer-recuadros");
    const LISTA_INTEGRANTES = document.querySelector("#footer-datos-grupo");

    //Titulo
    const TITULO = document.createElement('h3');
    TITULO.textContent = "Datos del Grupo";
    CONTENEDOR_INTEGRANTES.appendChild(TITULO);

    //Lista
    intergrantes.forEach(integrante => {
        const ITEM_INTEGRANTE = document.createElement('li');
        ITEM_INTEGRANTE.textContent = integrante.integrante;
        LISTA_INTEGRANTES.appendChild(ITEM_INTEGRANTE);
    });
    
    CONTENEDOR_INTEGRANTES.appendChild(LISTA_INTEGRANTES);
    FOOTER.appendChild(CONTENEDOR_INTEGRANTES);
    }
    

mostrarLinks(links_footer){

    }
}






