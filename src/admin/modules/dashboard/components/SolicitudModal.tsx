import { useEffect, useMemo, useState } from "react";
import { Box, Button, FormControl, InputAdornment, InputLabel, Select, TextField, Typography, MenuItem, FormHelperText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Grid from "@mui/material/Grid2";
import { getSolicitudById, postSaveSolicitud } from "../../../../store/admin/solicitud";
import { useAppDispatch } from "../../../../hooks/reactRedux";
import { useForm } from "../../../../hooks/useForm";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { CardAdmin, DatepickerAdmin } from "../../components";
import { useNavigate, useParams } from "react-router";

const formatDate = (date: Date) => {
    return date.toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).replace(",", "");
};

const formValidations = {
    marca: [(value: any) => value?.length >= 1, 'La Marca es obligatorio'],
    nombreContacto: [(value: any) => value?.length >= 1, 'El Nombre de Contacto es obligatorio'],
    numeroContacto: [
        (value: any) => /^\d+$/.test(value), 'El Número de Contacto debe contener solo números'
    ],
    // tipoSolicitud: [(value: any) => value !== '' && value !== null && value !== undefined, 'El Tipo de Solicitud es obligatorio'],
};


export const SolicitudModal = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /////////////////////////////////////////
    const { data , success, active } = useSelector((state: any) => state.solicitud);

    ///////////////////////////////////////////////////

    const { id } = useParams(); // Obtiene el ID de la URL

    useEffect(() => {
        if (id) {
            dispatch(getSolicitudById(id));
        }
    }, [id, dispatch]);

    //////////////////////////////////////////////////


    const { active:soli } = useSelector( (state: any) => state.solicitud);

    const initialFormState = useMemo(() => ({
        codigo: soli?.codigo || '',
        marca: soli?.marca || '',
        nombreContacto: soli?.nombreContacto || '',
        numeroContacto: soli?.numeroContacto || '',
        tipoSolicitud: soli?.tipoSolicitud || 'URGENTE',
        fechaEnvio: soli?.fechaEnvio ? formatDate(new Date(soli.fechaEnvio)) : formatDate(new Date())
    }), [ soli ]);

    const { formState, onInputChange, onSelectChange, isFormValid,
        codigo, marca, nombreContacto, numeroContacto, tipoSolicitud, fechaEnvio,
        marcaValid, nombreContactoValid, numeroContactoValid, tipoSolicitudValid
    } = useForm( initialFormState, formValidations );
    
    ///////////////////////////////////////////////////

    const onClickSaveSolicitud = () => {

        if ( !isFormValid ) return;
        try {
            if ( !active?.id ){
                dispatch(postSaveSolicitud( formState ));
            }else{
                console.log("EDITAR");
            }
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    }

    useEffect(() => {
        if (success && data) {
            Swal.fire("Éxito", data.sMsj, "success");
            navigate("/dashboard/solicitud/" + active.id );
        }
    }, [ success, data ] );

    /////////////////////////////////////////////////

    return (
        <>
            <CardAdmin>
                <Grid>
                    <Box
                        component="form"
                        noValidate
                    >
                        <Grid container rowSpacing={4} columnSpacing={3}>
                            <Grid size={12} sx={{ mb: 3 }}>
                                <Typography component="h1" variant="h4" sx={{ fontWeight: "600"}}>
                                    { soli?.id == null ? "CREAR SOLICITUD" : soli?.id !== null ? "EDITAR SOLICITUD" : "ACCION DESCONOCIDA"}
                                </Typography>
                            </Grid>

                            <Grid size={6} container sx={{ alignItems: "flex-start"}}>
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
                                        id="codigo"
                                        label="Código"
                                        name="codigo"
                                        value={ codigo }
                                        disabled
                                        onChange={ onInputChange }
                                    />
                                </Grid>

                                <Grid size={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="marca"
                                        label="Marca"
                                        name="marca"
                                        value={ marca }
                                        onChange={ onInputChange }                               
                                        error={ !!marcaValid }
                                        helperText={ marcaValid }
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <PersonIcon />
                                                    </InputAdornment>
                                                )
                                            }
                                        }}
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

                                <Grid size={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Tipo de Solicitud</InputLabel>
                                        <Select
                                            id="tipoSolicitud"
                                            name="tipoSolicitud"
                                            value={ tipoSolicitud }
                                            label="Tipo de Solicitud"
                                            onChange={ onSelectChange }
                                            error={ !!tipoSolicitudValid }
                                        >
                                            <MenuItem value="URGENTE">URGENTE</MenuItem>
                                            <MenuItem value="ALTA PRIORIDAD">ALTA PRIORIDAD</MenuItem>
                                            <MenuItem value="MEDIA PRIORIDAD">MEDIA PRIORIDAD</MenuItem>
                                            <MenuItem value="BAJA PRIORIDAD">BAJA PRIORIDAD</MenuItem>
                                        </Select>
                                        {tipoSolicitudValid && <FormHelperText>{ tipoSolicitudValid }</FormHelperText>}
                                    </FormControl>
                                </Grid>                                
                            </Grid>

                            <Grid size={6}>
                                <CardAdmin>
                                    <Typography variant="h5" sx={{m:0}}><b>Fecha de Envío</b></Typography>
                                    <DatepickerAdmin
                                        name="fechaEnvio"
                                        value={ fechaEnvio }
                                        onChange={onInputChange}
                                    />
                                </CardAdmin>
                            </Grid>

                            <Grid size={6}>
                                <Button type="button" onClick={ onClickSaveSolicitud } fullWidth variant="contained" hidden={ !codigo }>Guardar</Button>
                            </Grid>
                            {/* 
                            <Grid size={6}>
                                <Button onClick={ handleClose }  fullWidth variant="contained" hidden={ true }>Cerrar</Button>
                            </Grid> */}
                        </Grid>
                    </Box>
                </Grid>

            </CardAdmin>
        </>
    );
};
