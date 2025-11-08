import { NAV, CURSOS_INFO, INTEGRANTES_DEL_GRUPO,
        FOOTER_LINKS_ACERCA_DE ,FOOTER_LINKS_CURSOS, FOOTER_REDES} from "../constants/constants.js";
import { Header } from "../JS/header.js";
import { Navbar } from "../JS/navbar.js";
import { Footer } from "../JS/footer.js";
import { obtenerUsuarioLogueado, cursosInscriptosDelUsuario, localStorageUsuarios } from "./funciones-generales.js";

const header = new Header();
const barraNav = new Navbar();
const footer = new Footer();
const USUARIO_LOGUEADO = obtenerUsuarioLogueado();


header.mostrarHeader(CURSOS_INFO);
barraNav.mostrarItems(NAV);
mostrarPerfil();
eliminarPerfil();
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

    //Modal Confirmacion Eliminar Cuenta
    const MODAL_AVISO = document.createElement('dialog');
    MODAL_AVISO.classList.add('modal-confirmacion-eliminar-cuenta');
    MODAL_AVISO.textContent = "Desea Eliminar su Cuenta ??"

    const BOTON_CONFIRMAR = document.createElement('button');
    BOTON_CONFIRMAR.textContent = "CONFIRMAR";
    BOTON_CONFIRMAR.id = "boton-confirmar-eliminacion";
    const BOTON_CANCELAR = document.createElement('button');
    BOTON_CANCELAR.textContent = "CANCELAR";
    BOTON_CONFIRMAR.id = "boton-cancelar-eliminacion";
    
    MODAL_AVISO.appendChild(BOTON_CONFIRMAR);
    MODAL_AVISO.appendChild(BOTON_CANCELAR);

    PERFIL.appendChild(MODAL_AVISO);
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
                    <div class="abrir-comprar">
                        <a href=".${curso.link}">Ver Detalles</a>
                    </div>
                    <div class="duracion-valor">
                        <p>${curso.duracion} hs</p>
                        <p>$ ${curso.precio}</p>
                    </div>
                </div>`
    });
    return templateCursos;
}


function eliminarPerfil(){
    const PERFIL = document.querySelector(".principal");
    const BOTON_ELIMINAR_PERFIL = document.querySelector("#eliminar-perfil")
    const MODAL_AVISO = document.querySelector('.modal-confirmacion-eliminar-cuenta');
    

    BOTON_ELIMINAR_PERFIL.addEventListener('click', () => {
        //Fondo Oscuro
        const FONDO_OSCURO = document.createElement('div');
        FONDO_OSCURO.classList.add('eliminar-perfil-fondo');
        PERFIL.appendChild(FONDO_OSCURO);

        MODAL_AVISO.showModal();



        
        


    });
}