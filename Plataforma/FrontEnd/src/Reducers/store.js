import { createStore } from "redux";

const initialState = {
    usuarioLogeado:
    {
        nombre: '',
        passwotd: '',
        fechaNac: '',
        correo: '',
        roles: [],
        permisos: []
    },
}

const reducerDatos = (state = initialState, action) => {

    switch (action.type) {
        case 'NUEVO_USUARIO_LOGEADO': {

            return {
                ...state,
                usuarioLogeado: action.usuario
            }
        }
        default:
        // console.log("ERROR EN EL SWITCH DE REDUCER DE DATOS - STORE")
        // console.log(action.type) 
    }
    return state
}


export default createStore(reducerDatos);