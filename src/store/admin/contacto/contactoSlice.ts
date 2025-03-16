import { createSlice } from '@reduxjs/toolkit';

export const contactoSlice = createSlice({
    name: 'contacto',
    initialState: {
        contactos: null
        ,errMsj: ''
        ,success: false || null
        ,data: null
        ,active: null
    },
    reducers: {
        listContactosBySolicitud: (state, { payload } ) => {
            state.contactos = payload;
        },
        saveContacto: ( state, { payload }) => {
            state.success = payload.success;
            state.data = payload.data;
            state.errMsj = payload.errMsj;
        },
        setActiveContacto: (state, { payload } ) => {
            state.active = payload;
            state.success = payload.success;
            state.data = payload.data;
        },
    }
});
export const { listContactosBySolicitud, saveContacto, setActiveContacto } = contactoSlice.actions;