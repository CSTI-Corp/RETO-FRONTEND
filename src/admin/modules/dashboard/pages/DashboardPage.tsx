import Grid from "@mui/material/Grid2";
import { DatepickerAdmin } from '../../components/DatePickerAdmin';
import { CardAdmin } from "../../components/CardAdmin";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PerfilDashboard, SolicitudTable } from "../components";
import { getAllSolicitudes, setActiveSolicitud } from "../../../../store/admin/solicitud";
import { useAppDispatch } from "../../../../hooks/reactRedux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styles from '../css/DashboardStyle.module.css';
import { setActiveContacto } from "../../../../store/admin/contacto";


export const DashboardPage = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /////////////////////////////////////////////////////
    const { solicitudes } = useSelector((state: any) => state.solicitud);
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        dispatch(getAllSolicitudes());
        dispatch( setActiveSolicitud( {} ) );
        dispatch( setActiveContacto( {} ) );
    }, [dispatch]);

    useEffect(() => {
        if (solicitudes && solicitudes.length > 0) {
            setRows(solicitudes);
        }
    }, [solicitudes]);
    /////////////////////////////////////////////////////

    return (
        <section className={styles.sectDashboard}>

            <Grid container spacing={4}>
                <Grid size={3}>
                    <CardAdmin>
                        <Typography variant="h5"><b>CUMPLEAÑOS</b></Typography>
                        <DatepickerAdmin
                            name="fechaEnvioDashboard"
                            value="14/03/2025 00:00:00"
                            onChange={ () => {} }
                        />
                    </CardAdmin>
                </Grid>

                <Grid size={6}>
                    <CardAdmin>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5" sx={{ fontWeight: '700' }}>SOLICITUDES</Typography>
                            <Button
                                variant="contained"
                                // onClick={() => {
                                //     handleOpenModal(null);
                                // }}
                                aria-hidden="true"
                                onClick={() => {
                                    navigate("/dashboard/solicitud"); // Redirige a la página de agregar solicitud
                                }}
                            >
                                AGREGAR
                            </Button>
                        </Box>
                        <Box>
                            <SolicitudTable
                                rows={rows.map((row: any) => ({ ...row }))}
                            />
                        </Box>
                    </CardAdmin>
                </Grid>

                <Grid size={3}>
                    <CardAdmin>
                        <PerfilDashboard sUsuario={ "BORIS ESTRADA" } />
                    </CardAdmin>
                </Grid>

                { /****************/}
            </Grid>

            {/* <SolicitudModal open={open} handleClose={handleCloseModal} /> */}

        </section>
    )
}