export class Curso{
    
    #_nombre;
    #_descripcion;
    #_precio;
    #_valorcion;
    #_cantidadDeEstudiantes;
    #_duracion;
    #_requisitos;


    constructor(){
        
    }

    get nombre(){
        return this.#_nombre;
    }
    
    get descripcion(){
        return this.#_descripcion;
    }
    get precio(){
        return this.#_precio;
    }
    get valorcion(){
        return this.#_valorcion;
    }
    get cantidadDeEstudiantes(){
        return this.#_cantidadDeEstudiantes;
    }
    get duracion(){
        return this.#_duracion;
    }
    get requisitos(){
        return this.#_requisitos;
    }
}