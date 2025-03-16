import axios from "axios";
import { AppDispatch } from "../../store";
import { listSolicitud, listSolicitudById, saveSolicitud, setActiveSolicitud } from "../solicitud";
import { SolicitudInterface } from "../../../admin/interfaces/Solicitud.interface";

export const getAllSolicitudes = () => {
    return async( dispatch: AppDispatch ) => {

        try {
            const API_URL = import.meta.env.VITE_API_URL;

            const response = await axios.get(`${API_URL}/solicitud`, {
                timeout: 5000,
            });
            
            dispatch(listSolicitud( response.data ));
            
        } catch (error) {
            console.error("Error al al obtener los usuarios:", error);
        }
    }
}

export const getSolicitudById = ( id: string) => {
    return async( dispatch: AppDispatch ) => {

        try {
            const API_URL = import.meta.env.VITE_API_URL;

            const response = await axios.get(`${API_URL}/solicitud/${id}`, {
                timeout: 5000,
            });
            
            dispatch(listSolicitudById( response.data ));
            
        } catch (error) {
            console.error("Error al al obtener los usuarios:", error);
        }
    }
}

export const postSaveSolicitud = ( solicitudData: SolicitudInterface ) => {
    return async( dispatch: AppDispatch, getState: any ) => {

        try {
            const formatDate = (dateString: string) => {
                const [day, month, year, time] = dateString.split(/[/ ]/); // Divide por "/" o " "
                return `${year}-${month}-${day} ${time}`;
            };

            const API_URL = import.meta.env.VITE_API_URL;

            const newSolicitud = {
                ...solicitudData
                ,fechaEnvio: formatDate(solicitudData.fechaEnvio)
            }
            
            const response = await axios.post(
                `${API_URL}/solicitud`
                ,{ ...newSolicitud }
                ,{
                    timeout: 5000
                }
            );     
            dispatch(saveSolicitud( newSolicitud ));

            newSolicitud.id = response.data.id;
            newSolicitud.success = response.data.success;
            newSolicitud.data = response.data.data;

            dispatch( setActiveSolicitud( { ...newSolicitud } ) );            
            
        } catch (error) {
            console.error("Error al al insertar usuario:", error);
        }
    }
}
