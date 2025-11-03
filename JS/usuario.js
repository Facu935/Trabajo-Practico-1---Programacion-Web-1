export class Usuario{

    #_nombre;
    #_telefono;
    #_email;
    #_password;
    #_cursosInscriptos;
    #_logueado;
    #_cursosEnCarrito;


    constructor(nombre, email, telefono, password){
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.password = password;
    }

    set nombre(nombre){
        this.#_nombre = nombre;
    }
    get nombre(){
        return this.#_nombre;
    }
    set telefono(telefono){
        this.#_telefono = telefono;
    }
    get telefono(){
        return this.#_telefono;
    }
    set email(email){
        this.#_email = email;
    }
    get email(){
        return this.#_email;
    }
    set password(password){
        this.#_password = password;
    }
    get password(){
        return this.#_password;
    }
    set cursosInscriptos(cursos){
        this.#_cursosInscriptos = cursos;
    }
    get cursosInscriptos(){
        return this.#_cursosInscriptos;
    }
    set logueado(logueado){
        this.#_logueado = logueado;
    }
    get logueado(){
        return this.#_logueado;
    }
    set cursosEnCarrito(cursos){
        this.#_cursosEnCarrito = cursos;
    }
    get cursosEnCarrito(){
        return this.#_cursosEnCarrito;
    }
}