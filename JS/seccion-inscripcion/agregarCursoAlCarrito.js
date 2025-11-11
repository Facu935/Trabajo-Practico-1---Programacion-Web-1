import {
  obtenerUsuarioLogueado, guardarModificacionLocalStorageUsuarioLogueado, localStorageUsuarios, guardarModificacionLocalStorage
} from "../funciones-generales.js";

export function agregarCursoAlCarrito(precioFinal, cursoInfo) {
  try {
    const usuarioLogueado = obtenerUsuarioLogueado();

    if (usuarioLogueado) {
      const cursoCompleto = {
        nombre: cursoInfo.nombre,
        precio: parseFloat(precioFinal),
        img: cursoInfo.img,
        valoracion: cursoInfo.valoracion,
        duracion: cursoInfo.duracion
      };

      const yaEnCarrito = usuarioLogueado.cursosEnCarrito.find(curso => curso.nombre === cursoCompleto.nombre);
      const yaEnInscriptos = (usuarioLogueado.cursosInscriptos || []).find(curso => curso.nombre === cursoCompleto.nombre);

      if (!yaEnCarrito && !yaEnInscriptos) {
        usuarioLogueado.cursosEnCarrito.push(cursoCompleto);
        guardarModificacionLocalStorageUsuarioLogueado(usuarioLogueado);
        const todosLosUsuarios = localStorageUsuarios();
        const indiceUsuario = todosLosUsuarios.findIndex(user => user.email === usuarioLogueado.email);

        if (indiceUsuario !== -1) {
          todosLosUsuarios[indiceUsuario] = usuarioLogueado;
          guardarModificacionLocalStorage(todosLosUsuarios);
          return true;
        } else {
          alert("Error: No se pudo guardar la inscripción. Intente iniciar sesión nuevamente.");
          return false;
        }
      } else if (yaEnInscriptos) {
        alert("Ya estás inscripto en este curso.");
        return false;
      } else {
        alert("Ya has agregado este curso al carrito.");
        return false;
      }
    } else {
      alert("No se pudo agregar el curso. Debes iniciar sesión para inscribirte.");
      return false;
    }
  } catch (error) {
    alert("Ocurrió un error inesperado. No se pudo agregar el curso.");
    return false;
  }
}