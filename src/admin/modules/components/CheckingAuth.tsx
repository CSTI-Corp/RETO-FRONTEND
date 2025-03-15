import { CircularProgress } from '@mui/material';
import Grid from "@mui/material/Grid2";

export const CheckingAuth = () => {
  return (
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))', padding: 4 }}
    >

        <Grid container
            direction='row'
            justifyContent='center'
            >
            <CircularProgress color='warning' sx={{ color: "#ffffff"}} />
        </Grid>
    </Grid>
  )
}