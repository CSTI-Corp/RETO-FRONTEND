import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status          : 'checking' // 'Checking', 'not-authenticaded', 'authenticated'
        ,nIdUsuario     : null
        ,sUsuario       : null
        ,dFechaNac      : null
        ,errorMessage   : null
    },
    reducers: {
        login: ( state, { payload } ) => {           
            state.status    = 'authenticated';
            state.nIdUsuario    = payload.nIdUsuario;
            state.sUsuario      = payload.sUsuario;
            state.dFechaNac     = payload.dFechaNac;
            state.errorMessage  = payload.errorMessage;
            // // Guardar el token en localStorage
            // localStorage.setItem('authToken', payload.token);
        },
        logOut: ( state, { payload } ) => {
            state.status        = 'not-authenticaded';
            state.nIdUsuario    = null;
            state.sUsuario      = null;
            state.dFechaNac     = null;
            state.errorMessage  = payload.errMsj;
        },
        checkingCredentials: ( state ) => {
            state.status = 'checking';
        },
    }
});
export const { login, logOut, checkingCredentials } = authSlice.actions;