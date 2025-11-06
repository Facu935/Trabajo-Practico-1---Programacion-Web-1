export function localStorageUsuarios(){
    const USUARIOS_EXISTENTES = JSON.parse(localStorage.getItem('usuarios') || '[]');
    return USUARIOS_EXISTENTES;
    //Mira el estado del ARRAY de LOCAL STORAGE, un array con muchos usuarios y tiene de clave 'usuarios'
}

export function guardarModificacionLocalStorage(usuarios){
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
}
export function guardarModificacionLocalStorageUsuarioLogueado(usuario){
    localStorage.setItem('usuarioLogueado', JSON.stringify(usuario))
}

export function limpiarLocalStorage(){
    localStorage.clear();
}
export function limpiarUsuarioLogueado(){
    localStorage.removeItem('usuarioLogueado');
}


export function usuarioLogueado(usuarios){
    usuarios.forEach(persona => {
        if(persona.logueado){
            localStorage.setItem("usuarioLogueado", JSON.stringify(persona));
        } 
    });
}

export function validarUsuarioConectadoParaNav(){
    let bandera = false;
    const USUARIO_LOGUEADO = JSON.parse(localStorage.getItem("usuarioLogueado"));
        if (USUARIO_LOGUEADO && USUARIO_LOGUEADO.logueado){
            bandera = true;
        }
    return bandera;
}


export function obtenerUsuarioLogueado(){
    const USUARIO_LOGUEADO = JSON.parse(localStorage.getItem("usuarioLogueado"));
    return USUARIO_LOGUEADO;
}