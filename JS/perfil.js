import { NAV, CURSOS_INFO, INTEGRANTES_DEL_GRUPO,
        FOOTER_LINKS_ACERCA_DE ,FOOTER_LINKS_CURSOS, FOOTER_REDES} from "../constants/constants.js";
import { Header } from "../JS/header.js";
import { Navbar } from "../JS/navbar.js";
import { Footer } from "../JS/footer.js";
import { obtenerUsuarioLogueado, cursosInscriptosDelUsuario,
        localStorageUsuarios, limpiarUsuarioLogueado, guardarModificacionLocalStorage, 
        limpiarLocalStorage} from "./funciones-generales.js";

const header = new Header();
const barraNav = new Navbar();
const footer = new Footer();
const USUARIO_LOGUEADO = obtenerUsuarioLogueado();


header.mostrarHeader(CURSOS_INFO);
barraNav.mostrarItems(NAV);
mostrarPerfil();
footer.mostrarFooter(INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS,FOOTER_REDES);






function mostrarPerfil(){
    const PERFIL = document.querySelector(".principal");
    const CURSOS_INSCRIPTOS = cursosInscriptosDelUsuario();

    const templateTituloYNombre = `
    <h1>PERFIL</h1>
        <div class="perfil-imagen-nombre">
            <img src="../IMG/Perfil/avatar.avif" alt="Foto de Perfil" id="foto-perfil">
            <div class="recuadro-nombre">
                <h2 id="nombre-usuario">${USUARIO_LOGUEADO.nombre}</h2>
            </div>
        </div>
        <h2 class="titulos">Cursos Inscriptos</h2>
        <div class="cursos-inscripto">
        ${mostrarCursosInscriptos(CURSOS_INSCRIPTOS)}
        </div>`
        PERFIL.innerHTML = templateTituloYNombre;
    
    //Boton
    const BOTON_ELIMINAR_PERFIL = document.createElement('button');
    BOTON_ELIMINAR_PERFIL.id = 'eliminar-perfil';
    BOTON_ELIMINAR_PERFIL.textContent = " ELIMINAR PERFIL"    
    PERFIL.appendChild(BOTON_ELIMINAR_PERFIL);
    
    //Modal
    const MODAL_AVISO = document.createElement('dialog');
    const CONTENEDOR_MODAL = document.createElement('div')
    const BOTON_CONFIRMAR = document.createElement('button');
    const BOTON_CANCELAR = document.createElement('button');

    MODAL_AVISO.classList.add("modal");

    CONTENEDOR_MODAL.classList.add('modal-confirmacion-eliminar-cuenta');
    CONTENEDOR_MODAL.textContent = "Desea Eliminar su Cuenta ??"

    BOTON_CONFIRMAR.textContent = "CONFIRMAR";
    BOTON_CONFIRMAR.id = "boton-confirmar-eliminacion";
    
    BOTON_CANCELAR.textContent = "CANCELAR";
    BOTON_CANCELAR.id = "boton-cancelar-eliminacion";
    
    CONTENEDOR_MODAL.appendChild(BOTON_CONFIRMAR);
    CONTENEDOR_MODAL.appendChild(BOTON_CANCELAR);
    MODAL_AVISO.appendChild(CONTENEDOR_MODAL);

    PERFIL.appendChild(MODAL_AVISO);



    eliminarCuenta(PERFIL, MODAL_AVISO);
    cancelarEliminacion(BOTON_CANCELAR, MODAL_AVISO);
    confirmarEliminacion(BOTON_CONFIRMAR, MODAL_AVISO);





}












function mostrarCursosInscriptos(cursos){
    let templateCursos = '';
    cursos.forEach(curso => {
        templateCursos += `<div class="contenedor-curso">
                    <div class="imagen-curso-similar">
                        <img src="${curso.img}" alt="Logo ${curso.nombre}" />
                    </div>
                    <div class="titulo-curso">
                        <h4>CURSO ${curso.nombre}</h4>
                    </div>
                    <div class="duracion-valor">
                        <p>${curso.duracion} hs</p>
                        <p>$ ${curso.precio}</p>
                    </div>
                </div>`
    });
    return templateCursos;
}

function eliminarCuenta(perfil, modal){
    const BOTON_ELIMINAR = document.querySelector("#eliminar-perfil");
    BOTON_ELIMINAR.addEventListener('click', ()=> {
        
        const fondo = document.createElement('div');
        fondo.classList.add("eliminar-perfil-fondo");
        fondo.appendChild(modal);
        perfil.appendChild(fondo);
        modal.showModal();
    });
}

function cancelarEliminacion(boton_cancelar, modal){
        boton_cancelar.addEventListener('click', ()=>{
        const FONDO = document.querySelector(".eliminar-perfil-fondo")
        modal.close();
        FONDO.remove();
    });
}

function confirmarEliminacion(boton_confirmar, modal){
        boton_confirmar.addEventListener('click', () =>{
        const USUARIOS = localStorageUsuarios();
        const USUARIO_LOGUEADO = obtenerUsuarioLogueado();

        for (let i = 0; i < USUARIOS.length; i++){
            if (USUARIO_LOGUEADO.email === USUARIOS[i].email){
                USUARIOS.splice(i,1);
                guardarModificacionLocalStorage(USUARIOS);
                limpiarUsuarioLogueado();
                modal.close();
                window.location.href = '../index.html';
                return;
            }
        }
    });
}

