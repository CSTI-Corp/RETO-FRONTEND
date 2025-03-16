import { createSlice } from '@reduxjs/toolkit';

export const solicitudSlice = createSlice({
    name: 'solicitud'
    ,initialState: {
        solicitudes: {
            id              : null
            ,codigo         : null
            ,tipoSolicitud  : null
            ,marca          : null
            ,fechaEnvio     : null
            ,numeroContacto : null
            ,nombreContacto : null
        },
        errMsj: '',
        success: false || null,
        data: null,
        active: null
    }
    ,reducers: {
        listSolicitud: (state, { payload } ) => {
            state.success = payload.success;
            state.solicitudes = payload.data;
            state.errMsj = payload.errMsj;
        },
        saveSolicitud: ( state, { payload }) => {
            state.success = payload.success;
            state.data = payload.data;
            state.errMsj = payload.errMsj;
        },
        setActiveSolicitud: (state, { payload } ) => {
            state.active = payload;
            state.success = payload.success;
            state.data = payload.data;
        },
        listSolicitudById: ( state, { payload } ) => {
            state.active = payload;
        }
    }
});
export const { listSolicitud, saveSolicitud, setActiveSolicitud, listSolicitudById } = solicitudSlice.actions;