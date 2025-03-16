import Grid from "@mui/material/Grid2";
import { Box, Button, Card, Checkbox, CssBaseline, Divider, FormControl, FormControlLabel, FormLabel, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { startLoginWithEmailPassword } from '../../../../store/admin/auth';
import { useAppDispatch } from '../../../../hooks/reactRedux';
import { useForm } from '../../../../hooks/useForm';
import AppTheme from '../../../../theme/AppTheme';
import ColorModeSelect from '../../../../theme/ColorModeSelect';
import ForgotPassword from '../../components/ForgotPassword';
import { FacebookIcon, GoogleIcon } from '../../components/CustomIcons';
import styles from '../css/LoginStyle.module.css';
import { SignInContainer } from '../../components';

const formData = {
    sUsuario    : 'llopez'
    ,sPassword  : '123456'
}

const formValidations = {
    sUsuario: [ (value: any) => value.length >= 1, 'El Usuario es obligatorio' ]
    ,sPassword: [ (value: any) => value.length >= 1, 'El Password es obligatorio' ]
}

export const LoginPage = (props: { disableCustomTheme?: boolean }) => {

    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // LOGICA

    const { formState, onInputChange, isFormValid, sUsuario, sUsuarioValid, sPassword, sPasswordValid } = useForm(formData, formValidations);

    const onSubmit = (event: FormEvent<HTMLElement>) => {
        event.preventDefault();
        setFormSubmitted(true);

        if ( !isFormValid ) return;

        dispatch( startLoginWithEmailPassword(sUsuario, sPassword));
    }
    
    // const onGoogleSignIn = () => {
    //     console.log('onGoogleSignIn');
    //     //dispatch( startGoogleSignIn());
    // }

    return (
        <>
            <section className={styles.sectLogin}>
                <AppTheme {...props}>
                    <CssBaseline enableColorScheme />
                    <SignInContainer direction="column" justifyContent="center">
                        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />

                        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Grid size={4}>
                                <Card variant="outlined" sx={{ padding: '30px'}}>
                                    
                                    <Typography
                                        component="h1"
                                        variant="h4"
                                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                                    >
                                        Iniciar Sesión
                                    </Typography>
                                    <Box
                                        component="form"
                                        onSubmit={ onSubmit }
                                        noValidate
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                            gap: 2,
                                        }}
                                    >
                                        <FormControl>
                                            <h3> FormValid { isFormValid ? 'Valido' : 'Incorrecto' } </h3>
                                            <FormLabel htmlFor="sUsuario">Usuario</FormLabel>
                                            <TextField
                                                placeholder="bestrada"
                                                autoComplete="sUsuario"
                                                autoFocus
                                                required
                                                fullWidth
                                                variant="outlined"
                                                id="sUsuario"
                                                type="sUsuario"
                                                name="sUsuario"
                                                value={ sUsuario }
                                                onChange={ onInputChange }
                                                error={ !!sUsuarioValid }
                                                helperText={ sUsuarioValid }
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel htmlFor="sPassword">Contraseña</FormLabel>
                                            <TextField
                                                name="sPassword"
                                                placeholder="••••••"
                                                type="password"
                                                value={ sPassword }
                                                id="sPassword"
                                                autoComplete="current-password"
                                                autoFocus
                                                required
                                                fullWidth
                                                variant="outlined"
                                                onChange={ onInputChange }
                                                error={ !!sPasswordValid }
                                                helperText={ sPasswordValid }
                                            />
                                        </FormControl>
                                        <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Recuérdame"
                                        />
                                        <ForgotPassword open={open} handleClose={handleClose} />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                        >
                                            Ingresar
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={handleClickOpen}
                                            sx={{ alignSelf: 'center' }}
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </Button>
                                    </Box>
                                    <Divider>o</Divider>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => alert('Sign in with Google')}
                                            startIcon={<GoogleIcon />}
                                        >
                                            Iniciar sesión con Google
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={() => alert('Sign in with Facebook')}
                                            startIcon={<FacebookIcon />}
                                        >
                                            Iniciar sesión con Facebook
                                        </Button>
                                        <Typography sx={{ textAlign: 'center' }}>
                                            ¿No tienes una cuenta?{' '}
                                            <Button
                                                href="/material-ui/getting-started/templates/sign-in/"
                                                sx={{ alignSelf: 'center' }}
                                            >
                                                Regístrate
                                            </Button>
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>

                    </SignInContainer>
                </AppTheme>
            </section>
        </>
    )
}