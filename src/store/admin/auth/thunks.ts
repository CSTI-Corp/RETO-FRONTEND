import axios from "axios";
import { AppDispatch } from "../../store";
import { checkingCredentials, login, logOut } from "./";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

export const checkingAuthentication = () => {
    return async( dispatch: AppDispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startLoginWithEmailPassword = ( sUsuario: string, sPassword: string ) => {
    return async( dispatch: AppDispatch ) => {
        dispatch( checkingCredentials() );

        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await axios.post(
               `${API_URL}/Auth/AuthLogin`,
                { sUsuario, sPassword },
                { timeout: 5000 }
            );

            if (response.data.success) {
                const token = response.data.data;

                const { nIdUsuario, sUsuario, dFechaNac } = jwtDecode<{ nIdUsuario: number, sUsuario: string, dFechaNac: Date }>(token);
                 dispatch(login({ token, nIdUsuario, sUsuario, dFechaNac }));

                localStorage.setItem('authToken', token);
                Swal.fire("Bienvenido", sUsuario, "success");
            } else {
                dispatch(logOut( response.data ));
                Swal.fire("Alerta", response.data.errMsj, "warning");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    }
}

export const startLogOut = () => {
    return async( dispatch: AppDispatch ) => {
        dispatch( checkingCredentials() );

        try {
            dispatch(logOut({ errorMessage: null }));
            localStorage.removeItem('authToken');
            
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    }
}


export const startGoogleSignIn = () => {
    return async( dispatch : AppDispatch) => {
        dispatch( checkingCredentials() );

        try {
            // const API_URL = "http://localhost:3000"; // URL de tu API
            // const response = await axios.get(`${API_URL}/api`, {
            //     timeout: 5000,
            // });
            // dispatch(login(response.data));
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    }
}