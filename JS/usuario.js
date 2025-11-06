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
            cursosEnCarrito: [    { 
                                nombre: "HTML 5",
                                link: "./pages/curso-html.html",
                                precio: 60000,
                                valoracion: 4.7,
                                cantidadDeEstudiantes: 12.5,
                                duracion: 20,
                                requisitos: ["Acceso a Internet"],
                                destacado: true,
                                cuposDisponibles: 3,
                                img: "../IMG/Cursos/logo-html.png",
                                descripcion: "Este curso está diseñado para quienes quieren comenzar a construir páginas web desde cero. Se abordarán todos los fundamentos de HTML, incluyendo la estructura de un documento, etiquetas, enlaces, imágenes y formularios. Aprenderás a crear contenido estructurado y semántico, entendiendo cómo los navegadores interpretan el código y cómo mejorar la accesibilidad de tus páginas. Además, el curso incluye prácticas guiadas para que desarrolles pequeñas páginas web completas y funcionales. Al finalizar, serás capaz de crear sitios web simples y sentar las bases para aprender CSS y JavaScript."
                                },
                                { 
                                nombre: "HTML 5",
                                link: "./pages/curso-html.html",
                                precio: 60000,
                                valoracion: 4.7,
                                cantidadDeEstudiantes: 12.5,
                                duracion: 20,
                                requisitos: ["Acceso a Internet"],
                                destacado: true,
                                cuposDisponibles: 3,
                                img: "../IMG/Cursos/logo-html.png",
                                descripcion: "Este curso está diseñado para quienes quieren comenzar a construir páginas web desde cero. Se abordarán todos los fundamentos de HTML, incluyendo la estructura de un documento, etiquetas, enlaces, imágenes y formularios. Aprenderás a crear contenido estructurado y semántico, entendiendo cómo los navegadores interpretan el código y cómo mejorar la accesibilidad de tus páginas. Además, el curso incluye prácticas guiadas para que desarrolles pequeñas páginas web completas y funcionales. Al finalizar, serás capaz de crear sitios web simples y sentar las bases para aprender CSS y JavaScript."
                                }
                            ]
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