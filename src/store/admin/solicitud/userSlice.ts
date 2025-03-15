import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user'
    ,initialState: {
        users: {
            sUsuario        : null
            ,sPassword      : null
            ,bActivo        : null
            ,nIdPersona     : null
            ,nIdUsuario_crea: null
        },
        errMsj: '',
        success: false || null,
        data: null,
        active: null
    }
    ,reducers: {
        listUsers: (state, { payload } ) => {
            state.success = payload.success;
            state.users = payload.data;
            state.errMsj = payload.errMsj;
        },
        saveUser: ( state, { payload }) => {
            state.success = payload.success;
            state.data = payload.data;
            state.errMsj = payload.errMsj;
        },
        setActiveUser: (state, action ) => {
            state.active = action.payload;
        },
        updateUser: ( state, { payload } ) => {
            state.success = payload.success;
            state.data = payload.data;
            state.errMsj = payload.errMsj;
        },
        deleteUser: ( state, { payload } ) => {
            state.success = payload.success;
            state.data = payload.data;
            state.errMsj = payload.errMsj;
        },
        clearUserLogout: ( state ) => {
            state.success = null;
            state.data = null;
            state.errMsj = '';
        }
    }
});
export const { listUsers, saveUser, setActiveUser, updateUser, deleteUser, clearUserLogout } = userSlice.actions;