
import Grid from "@mui/material/Grid2";
import { HeaderAdministrador } from "../components/header/HeaderAdministrador";
import { LayoutPageProps } from "../../../interfaces/LayoutPageProps";
import styles from '../css/LayoutStyle.module.css';

export const LayoutAdministradorPage = ({ children }: LayoutPageProps, props: { disableCustomTheme?: boolean }) => {
    return (
        <Grid className={styles.sectDashboard}>
            {/* <AppTheme {...props}> */}
                {/* <CssBaseline enableColorScheme /> */}
                <HeaderAdministrador />

                <main>{ children }</main>

                {/* <FooterAdministrador /> */}
            {/* </AppTheme> */}
                                
            
        </Grid>
    )
}
