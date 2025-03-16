import { useEffect, useMemo, useState } from "react";
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Grid from "@mui/material/Grid2";
import { useAppDispatch } from "../../../../hooks/reactRedux";
import { useForm } from "../../../../hooks/useForm";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { CardAdmin } from "../../components";
import { ContactoTable } from "./ContactoTable";
import { useParams } from "react-router";
import { getContactoById, postSaveContacto } from "../../../../store/admin/contacto";

const formValidations = {
    nombreContacto: [(value: any) => value?.length >= 1, 'El Nombre de Contacto es obligatorio'],
    numeroContacto: [
        (value: any) => /^\d+$/.test(value), 'El Número de Contacto debe contener solo números'
    ],
};


export const ContactoForm = () => {

    const dispatch = useAppDispatch();

    ///////////////////////////////////////////////////

    const { id } = useParams(); // Obtiene el ID de la URL

    useEffect(() => {
        if (id) {
            dispatch(getContactoById(id));
        }
    }, [id, dispatch]);

    ///////////////////////////////////////////////////

    const {  data, success, active:conta, contactos } = useSelector( (state: any) => state.contacto);

    const initialFormState = useMemo(() => ({
        nombreContacto: '',
        numeroContacto: '',
    }), [ conta ]);

    const { formState, onInputChange, isFormValid, onResetForm,
        nombreContacto, numeroContacto, nombreContactoValid, numeroContactoValid
    } = useForm( initialFormState, formValidations );
    
    ///////////////////////////////////////////////////

    const onClickSaveContacto = () => {

        if ( !isFormValid ) return;
        try {

            if ( id ){
                dispatch(postSaveContacto( { ...formState, solicitudId:id } ));
                onResetForm();
            }else{
                Swal.fire("Alerta", "Agrega una solicitud para agregar Contactos", "warning");
            }

        } catch (error) {
            console.error("Error en el registro:", error);
        }
    }    

    /////////////////////////////////////////////////////
    const [rows, setRows] = useState<any[]>([]);;

    useEffect(() => {
        if (contactos && contactos.length > 0) {
            setRows(contactos);
        }
    }, [ contactos ]);
    
    /////////////////////////////////////////////////////

    useEffect(() => {
        if (success && data && id) {
            Swal.fire("Éxito", data.sMsj, "success");
            dispatch(getContactoById(id));
        }
    }, [ data ]);

    ////////////////////////////////////////////////////

    return (
        <>
            <CardAdmin>
                <Box
                    component="form"
                    noValidate
                >
                    <Grid container rowSpacing={4} columnSpacing={3}>
                        <Grid size={12} sx={{ mb: 3 }}>
                            <Typography component="h1" variant="h4" sx={{ fontWeight: "600"}}>
                                { conta?.id == null ? "CREAR CONTACTO" : conta?.id !== null ? "EDITAR CONTACTO" : "ACCION DESCONOCIDA"}
                            </Typography>
                        </Grid>                     

                        <Grid size={12} container columnSpacing={2}>
                            <Grid size={12}>
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
                                    id="nombreContacto"
                                    label="Nombre de Contacto"
                                    name="nombreContacto"
                                    value={ nombreContacto }
                                    onChange={ onInputChange }
                                    error={ !!nombreContactoValid }
                                    helperText={ nombreContactoValid }
                                />
                            </Grid>

                            <Grid size={12}>
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
                                    id="numeroContacto"
                                    label="Número de Contacto"
                                    name="numeroContacto"
                                    value={ numeroContacto }
                                    onChange={ onInputChange }
                                    error={ !!numeroContactoValid }
                                    helperText={ numeroContactoValid }
                                />
                            </Grid>

                            <Grid size={5}>
                                <Button type="button" onClick={ onClickSaveContacto }  fullWidth variant="contained" hidden={ true }>Agregar Contacto</Button>
                            </Grid>

                        </Grid>

                        <Grid size={ 12 }>
                            <ContactoTable
                                rows={rows.map((row: any) => ({ ...row }))}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </CardAdmin>            
        </>
    );
};
