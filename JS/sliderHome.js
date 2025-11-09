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

        const PRIMER_NODO = document.getElementById(`nodo-1`);
        PRIMER_NODO.style.backgroundColor = 'rgb(17, 63, 214)';
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

    mostrarImagenCadaXSegundos(imagenes){
            const sliderImagen = document.querySelector('.slider-contenedor');
            setInterval(()=>{
                cambioDeImagen(imagenes, sliderImagen);
            }, 4000);
    }



}

    function cambioDeImagen(imagenes, imagen_actual) {
        const cantidadNodos = imagenes.length;
        for(let i = 0; i < cantidadNodos; i++){
            const nodo = document.getElementById(`nodo-${i+1}`);
            switch(nodo.id){
                case 'nodo-1':
                    if (nodo.style.backgroundColor === 'rgb(17, 63, 214)'){
                        nodo.style.backgroundColor = 'rgb(255, 0, 0)';
                        const NODO_SIGUIENTE = document.getElementById(`nodo-2`);
                        NODO_SIGUIENTE.style.backgroundColor = 'rgb(17, 63, 214)';
                        imagen_actual.style.backgroundImage = `url(${imagenes[i+1].url})`;
                        return;
                    }
                break;
                case 'nodo-2':
                    if (nodo.style.backgroundColor == 'rgb(17, 63, 214)'){
                        nodo.style.backgroundColor = 'rgb(255, 0, 0)';
                        const NODO_SIGUIENTE = document.getElementById(`nodo-3`);
                        NODO_SIGUIENTE.style.backgroundColor = 'rgb(17, 63, 214)';
                        imagen_actual.style.backgroundImage = `url(${imagenes[i+1].url})`;
                        return;
                    }
                break;
                case 'nodo-3':
                    if (nodo.style.backgroundColor === 'rgb(17, 63, 214)'){
                        nodo.style.backgroundColor = 'rgb(255, 0, 0)';
                        const PRIMER_NODO = document.getElementById(`nodo-1`);
                        PRIMER_NODO.style.backgroundColor = 'rgb(17, 63, 214)';
                        imagen_actual.style.backgroundImage = `url(${imagenes[0].url})`;
                        return;
                    }
                break;              
            }



            /*
            const nodo = document.getElementById(`nodo-${i+1}`);
                if (nodo.style.backgroundColor == 'rgb(17, 63, 214)'){  //Chequea el seleccionado por color azul
                    nodo.style.backgroundColor == 'rgb(255, 0, 0)';
                    sliderImagen.style.backgroundImage = `url(${imagenes[i+1].url})`;
                }*/
            }
    }