import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logOut } from '../store/admin/auth';
import { jwtDecode } from 'jwt-decode';


export const useCheckAuth = () => {
  
    const { status } = useSelector( (state: any) => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
        const savedToken = localStorage.getItem('authToken'); // Asumiendo que guardas el token en el localStorage
    
        if (savedToken) {
            
            const { nIdUsuario, sUsuario, dFechaNac } = jwtDecode<{ nIdUsuario: number, sUsuario: string, dFechaNac: Date }>(savedToken);
            dispatch(login({ savedToken, nIdUsuario, sUsuario, dFechaNac }));

        } else {
            dispatch(logOut({ errorMessage: null }));
        }
    }, [dispatch]);

    return status;
}