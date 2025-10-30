export class SliderHome{
    constructor(){

    }

    mostrarNodos(imagenes){
        const cantidadNodos = imagenes.length;
        const contenedorNodos = document.querySelector('.contenedor-nodos');

        for(let i = 0; i < cantidadNodos; i++){
            const nodo = document.createElement('button');
            nodo.classList.add('nodos')
            nodo.id = `nodo-${i+1}`;
            contenedorNodos.appendChild(nodo);
        }


    }


    mostrarImagenesSegunNodoClickeado(imagenes){
            const cantidadNodos = imagenes.length;
            const sliderImagen = document.querySelector('.slider-contenedor');

            for(let i = 0; i < cantidadNodos; i++){
            const nodo = document.getElementById(`nodo-${i+1}`);
                nodo.addEventListener('click', () => {
                    sliderImagen.style.backgroundImage = `url(${imagenes[i].url})`;
            });
        }
    }


}