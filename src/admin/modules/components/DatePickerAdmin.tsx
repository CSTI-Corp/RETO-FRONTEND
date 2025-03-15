import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importar el idioma español
import { esES } from '@mui/x-date-pickers/locales';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

// Configurar dayjs para que use el idioma español
dayjs.locale('es');

export const DatepickerAdmin = ({ selectedDate }: { selectedDate: string | null }) => {
    return (
        <>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
                localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText} // Traducir DatePicker
            >
                <DemoContainer
                    components={[
                        'DatePicker',
                        'MobileDatePicker',
                        'DesktopDatePicker',
                        'StaticDatePicker',
                    ]}
                >
                    <DemoItem >
                        <StaticDatePicker
                            value={selectedDate ? dayjs(selectedDate, "DD/MM/YYYY HH:mm:ss") : null}
                            sx={{   
                                background: "transparent",
                                borderRadius: "10px",
                                ".Mui-selected": { // Cambia el color del día seleccionado
                                    backgroundColor: "#8dffa0 !important",
                                    color: "#ffffff",
                                },
                                ".MuiPickersDay-root": { // Estilo general de los días
                                    color: "#333",
                                    borderRadius: "10px"
                                },
                                ".MuiPickersDay-root:hover": { // Hover sobre los días
                                    backgroundColor: "#8dffa0",
                                    color: "#ffffff",
                                },
                                ".MuiDialogActions-root .MuiButtonBase-root": { // Botones como "OK" y "Cancelar"
                                    color: "#8dffa0",
                                },
                            }}
                        />
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>

        </>
    )
}
