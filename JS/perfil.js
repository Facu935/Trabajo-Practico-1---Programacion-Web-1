import {
    NAV, CURSOS_INFO, INTEGRANTES_DEL_GRUPO,
    FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES
} from "../constants/constants.js";
import { Header } from "../JS/header.js";
import { Navbar } from "../JS/navbar.js";
import { Footer } from "../JS/footer.js";
import {
    obtenerUsuarioLogueado, cursosInscriptosDelUsuario,
    localStorageUsuarios, limpiarUsuarioLogueado, guardarModificacionLocalStorage,
} from "./funciones-generales.js";

const header = new Header();
const barraNav = new Navbar();
const footer = new Footer();
const USUARIO_LOGUEADO = obtenerUsuarioLogueado();

header.mostrarHeader(CURSOS_INFO);
barraNav.mostrarItems(NAV);
mostrarPerfil();
formularioCambiarDatos();
footer.mostrarFooter(INTEGRANTES_DEL_GRUPO, FOOTER_LINKS_ACERCA_DE, FOOTER_LINKS_CURSOS, FOOTER_REDES);



/* ============================================================
        MOSTRAR PERFIL
============================================================ */
function mostrarPerfil() {
    const PERFIL = document.querySelector(".principal");
    const CURSOS_INSCRIPTOS = cursosInscriptosDelUsuario();
    const GIFT = USUARIO_LOGUEADO.giftcards || [];

    let template = `
    <h1>PERFIL</h1>
    <div class="perfil-imagen-nombre">
        <img src="../IMG/Perfil/avatar.avif" alt="Foto de Perfil" id="foto-perfil">
        <div class="recuadro-info">
            <h2 id="nombre-usuario">${USUARIO_LOGUEADO.nombre}</h2>
                    <ul class="lista-datos-perfil">
                        <li><strong>Email:</strong> ${USUARIO_LOGUEADO.email}</li>
                        <li><strong>Teléfono:</strong> ${USUARIO_LOGUEADO.telefono}</li>
                    </ul>
            <button id="boton-cambiar-datos">Cambiar Datos</button>        
        </div>
    </div>

    <h2 class="titulos">Cursos Inscriptos</h2>
    <div class="cursos-inscripto">
        ${mostrarCursosInscriptos(CURSOS_INSCRIPTOS)}
    </div>
    `;

    /* ------------------------ NUEVO: LISTA DE GIFTCARDS --------------------- */
    if (GIFT.length > 0) {
        template += `
        <h2 class="titulos">Giftcards Compradas</h2>
        <div class="giftcard-lista">
            ${mostrarGiftcards(GIFT)}
        </div>`;
    }

    PERFIL.innerHTML = template;

    /* ---------------- BOTÓN ELIMINAR PERFIL ---------------- */
    const BOTON_ELIMINAR_PERFIL = document.createElement('button');
    BOTON_ELIMINAR_PERFIL.id = 'eliminar-perfil';
    BOTON_ELIMINAR_PERFIL.textContent = " ELIMINAR PERFIL"
    PERFIL.appendChild(BOTON_ELIMINAR_PERFIL);

    const MODAL_AVISO = document.createElement('dialog');
    const CONTENEDOR_MODAL = document.createElement('div');
    const BOTON_CONFIRMAR = document.createElement('button');
    const BOTON_CANCELAR = document.createElement('button');

    MODAL_AVISO.classList.add("modal");
    CONTENEDOR_MODAL.classList.add('modal-confirmacion-eliminar-cuenta');
    CONTENEDOR_MODAL.textContent = "Desea Eliminar su Cuenta ??";
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

    /* Activar eliminación de giftcards */
    document.querySelectorAll(".btn-eliminar-gift").forEach(btn => {
        btn.addEventListener("click", () => {
            eliminarGiftcard(Number(btn.dataset.index));
        });
    });

    /* Activar eliminación de cursos */
    document.querySelectorAll(".btn-eliminar-curso").forEach(btn => {
        btn.addEventListener("click", () => {
            eliminarCurso(Number(btn.dataset.index));
        });
    });
}



/* ============================================================
        MOSTRAR CURSOS INSCRIPTOS (con botón eliminar)
============================================================ */
function mostrarCursosInscriptos(cursos) {
    let templateCursos = '';
    cursos.forEach((curso, index) => {
        templateCursos += `
        <div class="contenedor-curso">
            <div class="imagen-curso-similar">
                <img src="${curso.img}" alt="Logo ${curso.nombre}" />
            </div>
            <div class="titulo-curso">
                <h4>CURSO ${curso.nombre}</h4>
            </div>
            <div class="duracion-valor">
                <p>Duración: ${curso.duracion} hs</p>
                <p>Precio Unitario: $ ${curso.precio}</p>
                <p>Cantidad: ${curso.cantidad}</p>
            </div>
            <button class="btn-eliminar-curso" data-index="${index}">Eliminar Curso</button>
        </div>`;
    });
    return templateCursos;
}



/* ============================================================
        NUEVO — MOSTRAR TODAS LAS GIFTCARDS
============================================================ */
function mostrarGiftcards(giftcards) {
    return giftcards
        .map((g, index) => `
            <div class="giftcard-card">
                <div class="imagen-curso-similar">
                    <img src="../IMG/giftcard.png" style="width:120px;">
                </div>
                <div class="titulo-curso">
                    <h4>GIFT CARD</h4>
                </div>
                <div class="duracion-valor">
                    <p><strong>Destinatario:</strong> ${g.destinatario}</p>
                    <p><strong>Monto:</strong> $${g.monto}</p>
                </div>
                <button class="btn-eliminar-gift" data-index="${index}">Eliminar Giftcard</button>
            </div>
        `)
        .join("");
}



/* ============================================================
        NUEVO — ELIMINAR GIFTCARD
============================================================ */
function eliminarGiftcard(index) {
    const usuarios = localStorageUsuarios();
    const usuario = obtenerUsuarioLogueado();
    const i = usuarios.findIndex(u => u.email === usuario.email);

    usuarios[i].giftcards.splice(index, 1);
    guardarModificacionLocalStorage(usuarios);
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarios[i]));

    location.reload();
}



/* ============================================================
        NUEVO — ELIMINAR CURSO
============================================================ */
function eliminarCurso(index) {
    const usuarios = localStorageUsuarios();
    const usuario = obtenerUsuarioLogueado();
    const i = usuarios.findIndex(u => u.email === usuario.email);

    usuarios[i].cursosInscriptos.splice(index, 1);
    guardarModificacionLocalStorage(usuarios);
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarios[i]));

    location.reload();
}



/* ============================================================
        ELIMINAR CUENTA
============================================================ */
function eliminarCuenta(perfil, modal) {
    const BOTON_ELIMINAR = document.querySelector("#eliminar-perfil");
    BOTON_ELIMINAR.addEventListener('click', () => {

        const fondo = document.createElement('div');
        fondo.classList.add("eliminar-perfil-fondo");
        fondo.appendChild(modal);
        perfil.appendChild(fondo);
        modal.showModal();
    });
}

function cancelarEliminacion(boton_cancelar, modal) {
    boton_cancelar.addEventListener('click', () => {
        const FONDO = document.querySelector(".eliminar-perfil-fondo")
        modal.close();
        FONDO.remove();
    });
}

function confirmarEliminacion(boton_confirmar, modal) {
    boton_confirmar.addEventListener('click', () => {
        const USUARIOS = localStorageUsuarios();
        const USUARIO_LOGUEADO = obtenerUsuarioLogueado();

        for (let i = 0; i < USUARIOS.length; i++) {
            if (USUARIO_LOGUEADO.email === USUARIOS[i].email) {
                USUARIOS.splice(i, 1);
                guardarModificacionLocalStorage(USUARIOS);
                limpiarUsuarioLogueado();
                modal.close();
                window.location.href = '../index.html';
                return;
            }
        }
    });
}



/* ============================================================
        CAMBIAR DATOS (NO MODIFICADO)
============================================================ */
function formularioCambiarDatos() {
    const boton = document.getElementById('boton-cambiar-datos');
    const MODAL = document.createElement('dialog');
    const USUARIO = obtenerUsuarioLogueado();
    const EMAIL_PREVIO_DEL_LOGUEADO = USUARIO.email;

    boton.addEventListener('click', () => {
        creacionModal(MODAL);

        const FORMULARIO = MODAL.querySelector('.form-cambiar-datos');
        const boton_Cancelar = MODAL.querySelector('#cancelar-cambios');

        boton_Cancelar.addEventListener('click', () => {
            MODAL.close();
            MODAL.remove();
        });
        cambiarDatos(FORMULARIO, MODAL ,EMAIL_PREVIO_DEL_LOGUEADO);
        
    });
}

function creacionModal(modal){
    modal.classList.add('modal', 'modal-cambiar-datos');
        modal.innerHTML = `
            <form class="form-cambiar-datos" method="dialog">
                <h3>Cambiar Datos</h3>
                <p>(Cambie los datos que necesite, no hace falta rellenar todos los campos)</p>
                <div class= labels-cambiar-datos>
                    <label>
                        Usuario:
                        <input id="input-nombre" type="text" name="nombre">
                    </label>

                    <label>
                        Email:
                        <input id="input-email" type="email" name="email">
                    </label>

                    <label>
                        Teléfono:
                        <input id="input-tel" type="text" name="telefono">
                    </label>

                    <label>
                        Password:
                        <input id="input-password" type="password" name="password" autocomplete="nueva-password">
                    </label>
                </div>
                <div class="acciones-modal" ">
                    <button type="button" id="cancelar-cambios">Cancelar</button>
                    <button type="submit" id="guardar-cambios">Guardar</button>
                </div>
            </form>
        `;
        document.body.appendChild(modal);
        modal.showModal();
}

function cambiarDatos(form, modal, email_previo){
            form.addEventListener('submit', (event) => {
            event.preventDefault();

            const nombre = modal.querySelector('#input-nombre').value.trim();
            const email = modal.querySelector('#input-email').value.trim();
            const telefono = modal.querySelector('#input-tel').value.trim();
            const password = modal.querySelector('#input-password').value;

            const USUARIOS_GUARDADOS = localStorageUsuarios();
            const INDICE = USUARIOS_GUARDADOS.findIndex(usuario => usuario.email === email_previo);

            if (USUARIOS_GUARDADOS.some((usuario, indice) => usuario.email === email && indice !== INDICE)) {   
                alert('El email ya está en uso por otro usuario.');
                return;
            }

            if (nombre){
                USUARIOS_GUARDADOS[INDICE].nombre = nombre;
            }
            if (email){
                USUARIOS_GUARDADOS[INDICE].email = email;
            }
            if (telefono){
                USUARIOS_GUARDADOS[INDICE].telefono = telefono;
            }
            if (password){
                USUARIOS_GUARDADOS[INDICE].password = password;
            }

            localStorage.setItem('usuarios', JSON.stringify(USUARIOS_GUARDADOS));

            const usuarioActualizado = USUARIOS_GUARDADOS[INDICE];
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioActualizado));

            modal.close();
            modal.remove();
            window.location.reload();
        });
}


