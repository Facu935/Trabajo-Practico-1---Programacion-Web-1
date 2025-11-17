import { CURSOS_INFO } from "../constants/constants.js";
import {
    validarUsuarioConectadoParaNav, obtenerUsuarioLogueado, localStorageUsuarios, guardarModificacionLocalStorageUsuarioLogueado, guardarModificacionLocalStorage
} from "./funciones-generales.js";
import { mostrarNumeroDelCarrito } from "./header.js";



document.addEventListener("click", (e) => {
    const boton = e.target.closest(".boton-add-carrito");
    if (!boton) return;

    const cursoId = boton.dataset.curso;
    if (!cursoId) return;

    if (!validarUsuarioConectadoParaNav()) {
        window.location.href = `./pages/login.html?redirect=carrito&curso=${encodeURIComponent(cursoId)}`;
        return;
    }

    const usuario = obtenerUsuarioLogueado();
    if (!usuario) {
        window.location.href = `./pages/login.html?redirect=carrito&curso=${encodeURIComponent(cursoId)}`;
        return;
    }

    const curso = CURSOS_INFO.find(c => c.cursoId === cursoId);
    if (!curso) {
        alert('No se encontró el curso seleccionado.');
        return;
    }

    usuario.cursosEnCarrito = usuario.cursosEnCarrito || [];

    const existenteIdx = usuario.cursosEnCarrito.findIndex(item => item.cursoId === cursoId);

    if (existenteIdx !== -1) {
        const existente = usuario.cursosEnCarrito[existenteIdx];
        existente.cantidad = (Number(existente.cantidad) || 0) + 1;
    } else {
        const cursoParaCarrito = {
            ...curso,
            cantidad: 1,
            addedAt: new Date().toISOString()
        };
        usuario.cursosEnCarrito.push(cursoParaCarrito);
    }

    guardarModificacionLocalStorageUsuarioLogueado(usuario);

    const usuarios = localStorageUsuarios();
    const idx = usuarios.findIndex(u => u.email === usuario.email);
    if (idx !== -1) {
        usuarios[idx].cursosEnCarrito = usuario.cursosEnCarrito;
        guardarModificacionLocalStorage(usuarios);
    }
    const contenedor = document.getElementById('carrito-y-numero');
    mostrarNumeroDelCarrito(contenedor);
});