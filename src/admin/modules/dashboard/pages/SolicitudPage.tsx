import Grid from "@mui/material/Grid2";
import { SolicitudForm } from "../components";



import styles from '../css/DashboardStyle.module.css';
import { ContactoForm } from "../components/ContactoForm";

export const SolicitudPage = () => {
    return (
        <>
            <section className={styles.sectDashboard}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 12,  md: 7 }}>
                        <SolicitudForm />
                    </Grid>
                    
                    <Grid size={{ xs: 12, sm: 12,  md: 5 }}>
                        <ContactoForm />
                    </Grid>

                </Grid>
            </section>
            
        </>
    )
}
