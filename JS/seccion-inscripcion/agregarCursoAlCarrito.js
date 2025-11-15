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

    // Precio unitario: si el caller pasó un precio total (ej. empresa), lo dividimos por la cantidad.
    // Si pasaron el precio unitario (ej. personal), queda igual.
    const precioUnitario = cantidadNum > 0 ? (totalPriceNum / cantidadNum) : (Number(cursoInfo.precio) || 0);

    // Construimos el objeto de carrito con la info que usamos en el resto
    const cursoParaCarrito = {
      cursoId: cursoInfo.cursoId || cursoInfo.nombre,
      nombre: cursoInfo.nombre,
      precio: precioUnitario,
      img: cursoInfo.img,
      valoracion: cursoInfo.valoracion,
      duracion: cursoInfo.duracion,
      cantidad: cantidadNum,
    };

    // Referencias a arrays del usuario
    usuarioLogueado.cursosEnCarrito = usuarioLogueado.cursosEnCarrito || [];
    const yaEnCarrito = usuarioLogueado.cursosEnCarrito.find(c => (c.cursoId && c.cursoId === cursoParaCarrito.cursoId) || (c.nombre === cursoParaCarrito.nombre));
    const yaEnInscriptos = (usuarioLogueado.cursosInscriptos || []).find(c => (c.cursoId && c.cursoId === cursoParaCarrito.cursoId) || (c.nombre === cursoParaCarrito.nombre));

    if (yaEnInscriptos) {
      alert("Ya estás inscripto en este curso.");
      return false;
    }

    if (yaEnCarrito) {
      // Si ya está, simplemente sumamos la cantidad (mínimos cambios)
      const nuevaCantidad = (Number(yaEnCarrito.cantidad) || 0) + cantidadNum;
      yaEnCarrito.cantidad = nuevaCantidad;

      // Actualizamos el precio unitario por si fuese distinto (reemplazamos el unitario con el nuevo calculado)
      yaEnCarrito.precio = Number(precioUnitario);

    } else {
      // No estaba: lo pusheamos completo
      usuarioLogueado.cursosEnCarrito.push(cursoParaCarrito);
    }

    // Guardar usuario logueado actualizado
    guardarModificacionLocalStorageUsuarioLogueado(usuarioLogueado);

    // Actualizar la colección completa de usuarios en localStorage
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
