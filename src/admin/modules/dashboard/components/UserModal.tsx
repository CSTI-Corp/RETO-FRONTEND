import { FC, useEffect, useState } from "react";
import { Box, Button, FormControlLabel, IconButton, InputAdornment, Modal, TextField, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Grid from "@mui/material/Grid2";
import isotipo from '../../../modules/auth/img/isotipo.png';
import { IOSSwitch } from "./IOSSwitch";
import { patchUpdateUser, postSaveUser, setActiveUser } from "../../../../store/admin/solicitud";
import { useAppDispatch } from "../../../../hooks/reactRedux";
import { useForm } from "../../../../hooks/useForm";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface UserModalProps {
    open: boolean;
    handleClose: () => void;
}

const formValidations = {
    sUsuario: [(value: any) => value?.length >= 1, 'El Usuario es obligatorio'],
    sPassword: [(value: any) => value?.length >= 1, 'El Password es obligatorio'],
};


export const UserModal: FC<UserModalProps> = ({ open, handleClose }) => {

    const dispatch = useAppDispatch();

    /////////////////////////////////////////
    const { data ,success } = useSelector((state: any) => state.user);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault(); };

    ///////////////////////////////////////////////////

    const { active:user } = useSelector( (state: any) => state.user);
    const { formState, onInputChange, sUsuario, sNombreCompleto, isFormValid, sUsuarioValid, sPasswordValid, nIdUsuario } = useForm( user || { sUsuario: '', sPassword: '', sNombreCompleto: '' }, formValidations );
    
    ///////////////////////////////////////////////////

    useEffect(() => {
        dispatch(setActiveUser( formState )); // Actualiza los datos del usuario si cambian
    }, [ formState ]);
    
    ///////////////////////////////////////////////////

    const onClickSaveUser = () => {

        if ( !isFormValid ) return;
        
        try {
            if ( !formState.nIdUsuario ){
                dispatch(postSaveUser( formState ));
            }else{
                dispatch(patchUpdateUser( formState ));
            }

        } catch (error) {
            console.error("Error en el registro:", error);
        }
    }

    useEffect(() => {
        if (success && data) {
            Swal.fire("Éxito", data.sMsj, "success");
            handleClose();
        }
    }, [success, data]);

    /////////////////////////////////////////////////

    return (
        <Modal open={ open } onClose={ handleClose }>
            <Box
                component="form"
                noValidate
                sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 24, width: '600px'
                }}
            >
                <Grid container spacing={3}>
                    <Grid size={12} sx={{ mb: 3 }}>
                        <Typography component="h1" variant="h4">
                            <img src={isotipo} alt="" width={40} style={{ verticalAlign: 'middle' }} />
                            { nIdUsuario == null ? "CREAR USUARIO" : user !== null ? "EDITAR USUARIO" : "ACCION DESCONOCIDA"}
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <TextField                            
                            variant="outlined"
                            fullWidth
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <PersonIcon />
                                        </InputAdornment>
                                    )
                                }
                            }}
                            id="sUsuario"
                            label="Usuario"
                            name="sUsuario"
                            value={ sUsuario }
                            onChange={ onInputChange }
                            error={ !!sUsuarioValid }
                            helperText={ sUsuarioValid }
                        />
                    </Grid>

                    <Grid size={6}>                        
                        <TextField
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            id="password"
                            label="Password"
                            name="sPassword"
                            onChange={onInputChange}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                                }
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={ handleMouseUpPassword }
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                            error={ !!sPasswordValid }
                            helperText={ sPasswordValid }
                        />
                    </Grid>

                    <Grid size={9}>
                        <TextField
                            label="Nombre Completo"
                            variant="outlined"
                            fullWidth
                            disabled
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <PersonIcon />
                                        </InputAdornment>
                                    )
                                }
                            }}
                            id="sNombreCompleto"
                            name="sNombreCompleto"
                            value={ sNombreCompleto }
                            onChange={ onInputChange }
                        />
                    </Grid>

                    <Grid size={3}>
                        <FormControlLabel
                            control={<IOSSwitch sx={{ mr: 1 }} defaultChecked />}
                            label="Activo"
                            sx={{ mt: 2 }}
                        />
                    </Grid>

                    <Grid size={6}>
                        <Button type="button" onClick={ onClickSaveUser } fullWidth variant="contained" hidden={ !nIdUsuario }>Guardar</Button>
                    </Grid>

                    <Grid size={6}>
                        <Button onClick={ handleClose }  fullWidth variant="contained" hidden={ true }>Cerrar</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};
