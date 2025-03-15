import Grid from '@mui/material/Grid2';
import { Box, Typography, Avatar } from '@mui/material';

import CircleIcon from '@mui/icons-material/Circle';
import EditIcon from '@mui/icons-material/Edit';

import imgUser from '../img/user.jpg';
import imgUserShape from '../img/shape-user.png';
import { FC } from 'react';

interface PerfilDashboardProps {
    sUsuario: string;
}

export const PerfilDashboard: FC<PerfilDashboardProps> = ({ sUsuario }) => {
    return (
        <>
            <Grid>
                <Grid container>
                    <Grid size={12} sx={{ textAlign: "right"}}>
                        <EditIcon />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid size={12}>
                        <Box
                            sx={{
                                position: "relative"                               
                                ,'& .MuiAvatar-root:before': {
                                    content: "''"
                                    ,position: "absolute"
                                    ,width: "100%"
                                    ,height: "100%"
                                    ,top: 0
                                    ,left: 0
                                    ,backgroundImage: `url(${ imgUserShape })`
                                    ,backgroundSize: "100%"
                                }
                            }}
                        >
                            <Avatar
                                alt="Remy Sharp"
                                src={ imgUser }
                                sx={{
                                    width: "100%"
                                    ,height: "100%"
                                    ,maxWidth: "250px"
                                    ,m: "0 auto"
                                    ,padding: "40px"
                                    ,'& .MuiAvatar-img': {
                                        borderRadius: "50%"
                                    }
                                }}
                            />
                            <CircleIcon sx={{ position: "absolute", color: "#00000", bottom: "30px", right: "30px" }} />
                        </Box>
                        <Box>
                            <Typography variant='h5' sx={{ fontWeight: "700", textAlign: "center", mt: 3}}>{ sUsuario } </Typography>
                            <Typography variant='subtitle1' sx={{ textAlign: "center", fontWeight: "500", color: "#a5a5a5", mb: 3 }}>Ing. Software</Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container size={ 12 } spacing={4} sx={{ justifyContent: "center", alignItems: "center" }}>
                    <Grid size={ 4 } sx={{ width: "70px", boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)", borderRadius: "20px", padding: "5px" }}>
                        <CircleIcon sx={{ verticalAlign: "middle", width: "25px", color: "#c9ffd4" }} /> 01
                    </Grid>
                    <Grid size={ 4 } sx={{ width: "70px", boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)", borderRadius: "20px", padding: "5px" }}>
                        <CircleIcon sx={{ verticalAlign: "middle", width: "25px", color: "#c9ffd4" }} /> 01
                    </Grid>
                    <Grid size={ 4 } sx={{ width: "70px", boxShadow: "0px 3px 6px 0px rgba(140, 149, 159, 0.15)", borderRadius: "20px", padding: "5px" }}>
                        <CircleIcon sx={{ verticalAlign: "middle", width: "25px", color: "#c9ffd4" }} /> 01
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
