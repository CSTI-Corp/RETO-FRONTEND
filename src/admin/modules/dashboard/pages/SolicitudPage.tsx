import Grid from "@mui/material/Grid2";
import { SolicitudModal } from "../components";



import styles from '../css/DashboardStyle.module.css';
import { ContactoModal } from "../components/ContactoModal";

export const SolicitudPage = () => {
    return (
        <>
            <section className={styles.sectDashboard}>
                <Grid container spacing={4}>
                    <Grid size={7}>
                        <SolicitudModal />
                    </Grid>


                    <Grid size={5}>
                        <ContactoModal />
                    </Grid>

                </Grid>
            </section>
            
        </>
    )
}
