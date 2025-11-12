import { CURSOS_INFO } from "../constants/constants.js";
import { validarUsuarioConectadoParaNav } from "./funciones-generales.js";
import { mostrarModal } from "./modalCursos.js";


document.addEventListener("click", e => {
    if (e.target.classList.contains("boton-inscribirse")) {

        if (!validarUsuarioConectadoParaNav()) {
            window.location.href = "../pages/login.html";
            return;
        }

        const cursoId = e.target.dataset.curso;
        const cursoSeleccionado = CURSOS_INFO.find(c => c.cursoId === cursoId);

        mostrarModal(cursoSeleccionado);
    }
});