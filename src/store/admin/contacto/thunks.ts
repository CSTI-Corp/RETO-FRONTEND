import axios from "axios";
import { AppDispatch } from "../../store";
import { listContactosBySolicitud, saveContacto, setActiveContacto } from "./contactoSlice";
import { ContactoInterface } from "../../../admin/interfaces/Contacto.interface";

export const getContactoById = ( id: string ) => {
    return async( dispatch: AppDispatch ) => {

        try {
            const API_URL = import.meta.env.VITE_API_URL;
            
            /// Obtén el token del localStorage
            //const token = localStorage.getItem("authToken");

            const response = await axios.get(`${API_URL}/contacto/solicitud/${ id }`, {
                //headers: { Authorization: token ? `Bearer ${token}` : "" },
                timeout: 5000,
            });
            dispatch(listContactosBySolicitud( response.data ));
            
        } catch (error) {
            console.error("Error al al obtener los contacto:", error);
        }
    }
}


export const postSaveContacto = ( contactoData: ContactoInterface ) => {
    return async( dispatch: AppDispatch ) => {

        try {

            const API_URL = import.meta.env.VITE_API_URL;

            const response = await axios.post(
                `${API_URL}/contacto`
                ,{ ...contactoData }
                ,{
                    timeout: 5000
                }
            );

            dispatch(saveContacto( contactoData ));
            
            contactoData.id = response.data.id;
            contactoData.success = response.data.success;
            contactoData.data = response.data.data;

            dispatch( setActiveContacto( contactoData ) );

            
        } catch (error) {
            console.error("Error al al obtener los contacto:", error);
        }
    }
}