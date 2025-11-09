import { USUARIOS_REGISTRADOS } from "../constants/constants.js";

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
        this.cursosInscriptos = [];
        this.logueado = false;
        this.cursosEnCarrito = [];
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

    convertirUsuarioNuevoAPlanoParaJSON(){
        return {
            nombre: this.nombre,
            email: this.email,
            telefono: this.telefono,
            password: this.password,
            cursosInscriptos: this.cursosInscriptos,
            logueado: this.logueado,
            cursosEnCarrito: this.cursosEnCarrito      
        }
    }



    agregarUsuarioALocalStorage(usuario){
        const usuarioPlano = usuario.convertirUsuarioNuevoAPlanoParaJSON();
        const coleccionDelLocalStorage = localStorage.getItem('usuarios');
        const usuarios = JSON.parse(coleccionDelLocalStorage || '[]');       //Parsea lo que haya en el array O comienza vacio

        usuarios.push(usuarioPlano);      //Pushea el objeto (usuario) al array del LOCAL STORAGE;
        localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Va pisando la clave usuarios, pero aun asi agregando cada usuario plano en el Push

        const USUARIOS_EXISTENTES = localStorage.getItem('usuarios');
        console.log('Usuarios en storage:', JSON.parse(USUARIOS_EXISTENTES) || '[]');

    }
    
    

    


}