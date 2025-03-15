import { Box, FormGroup } from "@mui/material";
import Grid from "@mui/material/Grid2";


import { ThemeSwitch } from "../buttons/ThemeSwitch";
import { ProfileButton } from "../buttons/ProfileButton";
import { SearchBar } from "../textField/SearchBar";
import { SideBar } from "./SideBar";
import style from '../../css/HeaderAdministrador.module.css';

export const HeaderAdministrador = () => {

    return (
        <>
            <SideBar />
            <nav>
                <Box sx={{ flexGrow: 1, paddingLeft: 15 }}>
                    <Grid container padding={3} size={12} sx={{ alignItems: 'center', justifyContent: 'space-between'}}>
                        <Grid size={2}>
                        <h2>¡Bienvenido!</h2>
                        </Grid>

                        <Grid size={4} className={style.boxSearch}>
                            <SearchBar />
                        </Grid>

                        <Grid size={4} >
                            <FormGroup sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexFlow: "row"}}>
                                <ThemeSwitch />  {/* ✅ Nuevo componente del switch */}
                                <ProfileButton /> {/* ✅ Nuevo componente del botón de perfil */}                     
                            </FormGroup>                        
                        </Grid>
                    </Grid>
                </Box>
            </nav>
            
        </>
    )
}
