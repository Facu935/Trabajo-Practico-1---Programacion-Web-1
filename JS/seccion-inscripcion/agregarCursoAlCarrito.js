import {
  obtenerUsuarioLogueado, guardarModificacionLocalStorageUsuarioLogueado, localStorageUsuarios, guardarModificacionLocalStorage
} from "../funciones-generales.js";

export function agregarCursoAlCarrito(precioFinal, cursoInfo, cantidad = 1) {
  try {
    const usuarioLogueado = obtenerUsuarioLogueado();

    if (!usuarioLogueado) {
      alert("No se pudo agregar el curso. Debes iniciar sesión para inscribirte.");
      return false;
    }

    const cantidadNum = cantidad || 1;
    const totalPriceNum = precioFinal || Number(cursoInfo.precio) || 0;
    const precioUnitario = cantidadNum > 0 ? (totalPriceNum / cantidadNum) : (Number(cursoInfo.precio) || 0);

    const cursoParaCarrito = {
      cursoId: cursoInfo.cursoId || cursoInfo.nombre,
      nombre: cursoInfo.nombre,
      precio: precioUnitario,
      img: cursoInfo.img,
      valoracion: cursoInfo.valoracion,
      duracion: cursoInfo.duracion,
      cantidad: cantidadNum,
    };

    usuarioLogueado.cursosEnCarrito = usuarioLogueado.cursosEnCarrito || [];
    const yaEnCarrito = usuarioLogueado.cursosEnCarrito.find(c => (c.cursoId && c.cursoId === cursoParaCarrito.cursoId) || (c.nombre === cursoParaCarrito.nombre));
    const yaEnInscriptos = (usuarioLogueado.cursosInscriptos || []).find(c => (c.cursoId && c.cursoId === cursoParaCarrito.cursoId) || (c.nombre === cursoParaCarrito.nombre));

    if (yaEnInscriptos) {
      alert("Ya estás inscripto en este curso.");
      return false;
    }

    if (yaEnCarrito) {
      const nuevaCantidad = (Number(yaEnCarrito.cantidad) || 0) + cantidadNum;
      yaEnCarrito.cantidad = nuevaCantidad;

      yaEnCarrito.precio = Number(precioUnitario);

    } else {
      usuarioLogueado.cursosEnCarrito.push(cursoParaCarrito);
    }

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

  } catch (error) {
    console.error(error);
    alert("Ocurrió un error inesperado. No se pudo agregar el curso.");
    return false;
  }
}
