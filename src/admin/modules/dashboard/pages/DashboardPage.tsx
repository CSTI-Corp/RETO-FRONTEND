import Grid from "@mui/material/Grid2";
import { DatepickerAdmin } from '../../components/DatePickerAdmin';
import styles from '../css/DashboardStyle.module.css';
import { CardAdmin } from "../../components/CardAdmin";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PerfilDashboard, UserTable } from "../components";
import { delDeleteUser, getAllSolicitudes, setActiveUser } from "../../../../store/admin/solicitud";
import { useAppDispatch } from "../../../../hooks/reactRedux";
import { useSelector } from "react-redux";
import { UserModal } from "../components/UserModal";
import Swal from "sweetalert2";


export const DashboardPage = () => {

    const dispatch = useAppDispatch();
    
    const { sUsuario, dFechaNac } = useSelector((state: any) => state.auth);

    /////////////////////////////////////////////////////
    const [open, setOpen ] = useState(false);

    const handleOpenModal = (row: any) => {
        dispatch(setActiveUser(row));
        setOpen(true);
    };

    const handleCloseModal = () => {
        dispatch(getAllSolicitudes());
        dispatch(setActiveUser(null));
        setOpen(false);
    }

    const handleDeleteModal = (row: any) => {
        dispatch(setActiveUser(row));

        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch( delDeleteUser( row ) );

                Swal.fire({
                    title: "Eliminado!",
                    text: "El usuario fue eliminado",
                    icon: "success"
                });
            }
        });
    };
    /////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    const { users } = useSelector((state: any) => state.user);
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        dispatch(getAllSolicitudes());
    }, [dispatch]);

    useEffect(() => {
        if (users && users.length > 0) {
            setRows(users);
        }
    }, [users]);
    /////////////////////////////////////////////////////

    return (
        <section className={styles.sectDashboard}>

            <Grid container spacing={4}>
                <Grid size={3}>
                    <CardAdmin>
                        <Typography variant="h5"><b>CUMPLEAÑOS</b></Typography>
                        <DatepickerAdmin selectedDate={dFechaNac} />
                    </CardAdmin>
                </Grid>

                <Grid size={6}>
                    <CardAdmin>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5" sx={{ fontWeight: '700' }}>USUARIOS</Typography>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    handleOpenModal(null);
                                }}
                            >
                                AGREGAR
                            </Button>
                        </Box>
                        <Box>
                            <UserTable
                                rows={rows.map((row: any) => ({ ...row, id: row.nIdUsuario }))}
                                handleOpenModal={ handleOpenModal }
                                handleDeleteUser={ handleDeleteModal }
                            />
                        </Box>
                    </CardAdmin>
                </Grid>

                <Grid size={3}>
                    <CardAdmin>
                        <PerfilDashboard sUsuario={ sUsuario } />
                    </CardAdmin>
                </Grid>

                { /****************/}
            </Grid>

            <UserModal open={open} handleClose={handleCloseModal} />

        </section>
    )
}