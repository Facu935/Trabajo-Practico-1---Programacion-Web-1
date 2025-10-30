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

            //Nodo Seleccionado
            for(let i = 0; i < cantidadNodos; i++){
            const nodo = document.getElementById(`nodo-${i+1}`);
                nodo.addEventListener('click', () => {
                    sliderImagen.style.backgroundImage = `url(${imagenes[i].url})`;
                    nodo.style.backgroundColor = 'rgb(17, 63, 214)';

                    //Cambio en los otros Nodos
                    for(let j = 0; j < cantidadNodos; j++){
                        if(j !== i){
                            const otroNodo = document.getElementById(`nodo-${j+1}`);
                            otroNodo.style.backgroundColor = 'rgb(255, 0, 0)';
                        }
                    }
                    
            });
        }
    }


}