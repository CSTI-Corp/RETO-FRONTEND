import axios from "axios";
import { AppDispatch } from "../../store";
import { clearUserLogout, deleteUser, listUsers, saveUser, updateUser } from "../solicitud";
import { UserInterface } from "../../../admin/interfaces/User.interface";

export const getAllSolicitudes = () => {
    return async( dispatch: AppDispatch ) => {

        try {
            const API_URL = import.meta.env.VITE_API_URL;
            
            /// Obtén el token del localStorage
            //const token = localStorage.getItem("authToken");

            const response = await axios.get(`${API_URL}/solicitud`, {
                //headers: { Authorization: token ? `Bearer ${token}` : "" },
                timeout: 5000,
            });
            
            dispatch(listUsers( response.data ));
            
        } catch (error) {
            console.error("Error al al obtener los usuarios:", error);
        }
    }
}

// export const postSaveUser = ( userData: UserInterface ) => {
//     return async( dispatch: AppDispatch ) => {

//         try {
//             const API_URL = import.meta.env.VITE_API_URL;

//             const user = {
//                 ...userData
//                 ,bActivo: true
//                 ,nIdPersona: 1
//                 ,nIdUsuario_crea: 1
//             }
//             const token = localStorage.getItem("authToken");

//             const response = await axios.post(
//                 `${API_URL}/Usuario/insUsuario`,
//                 { ...user },
//                 {headers: { Authorization: token ? `Bearer ${token}` : "" },timeout: 5000,
//             });

            
//             dispatch(saveUser( response.data ));
            
            
//         } catch (error) {
//             console.error("Error al al insertar usuario:", error);
//         }
//     }
// }

export const postSaveUser = ( userData: UserInterface ) => {
    return async( dispatch: AppDispatch, getState: any ) => {

        try {

            const { nIdUsuario } = getState().auth;

            const API_URL = import.meta.env.VITE_API_URL;

            const newUser = {
                ...userData
                ,bActivo: true
                ,nIdPersona: 1
                ,nIdUsuario_crea: nIdUsuario
            }

            const token = localStorage.getItem("authToken");

            const response = await axios.post(
                `${API_URL}/Usuario/insUsuario`,
                { ...newUser },
                {headers: { Authorization: token ? `Bearer ${token}` : "" },timeout: 5000,
            });
            
            dispatch(saveUser( response.data ));
            
            
        } catch (error) {
            console.error("Error al al insertar usuario:", error);
        }
    }
}

export const patchUpdateUser = (userData: UserInterface) => {
    return async (dispatch: AppDispatch) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL;

            const updatedUser = {
                ...userData
            };

            const token = localStorage.getItem("authToken");

            const response = await axios.patch(
                `${API_URL}/Usuario/updUsuario`,
                updatedUser,
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                    timeout: 5000,
                }
            );
            dispatch(updateUser(response.data));
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    };
};


export const delDeleteUser = (userData: UserInterface) => {
    return async (dispatch: AppDispatch) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            
            const { nIdUsuario } = userData;

            const token = localStorage.getItem("authToken");

            const response = await axios.delete(
                `${API_URL}/Usuario/dltUsuario?nIdUsuario=${ nIdUsuario }`,
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                    timeout: 5000,
                }
            );
            dispatch(deleteUser(response.data));
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    };
};

export const cleanUserLogout = () => {
    return async (dispatch: AppDispatch) => {
        try {           
            dispatch(clearUserLogout());
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
        }
    };
};

