import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importar el idioma español
import { esES } from '@mui/x-date-pickers/locales';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

// Configurar dayjs para que use el idioma español
dayjs.locale('es');

interface DatepickerAdminProps {
    value: string | null;
    name: string;
    onChange: (event: { target: { name: string; value: string } }) => void;
}

export const DatepickerAdmin = ({ value, name, onChange }: DatepickerAdminProps) => {

    const handleDateChange = (date: any) => {
        if (!date) return;
        const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm:ss");

        onChange({ target: { name, value: formattedDate } });
    };

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
                            value={value ? dayjs(value, "DD/MM/YYYY HH:mm:ss") : null}
                            onChange={handleDateChange}
                            sx={{   
                                background: "transparent",
                                borderRadius: "10px",
                                ".Mui-selected": { // Cambia el color del día seleccionado
                                    backgroundColor: "#aaef62 !important",
                                    color: "#ffffff",
                                },
                                ".MuiPickersDay-root": { // Estilo general de los días
                                    color: "#333",
                                    borderRadius: "10px"
                                },
                                ".MuiPickersDay-root:hover": { // Hover sobre los días
                                    backgroundColor: "#aaef62",
                                    color: "#ffffff",
                                },
                                ".MuiDialogActions-root .MuiButtonBase-root": { // Botones como "OK" y "Cancelar"
                                    color: "#aaef62",
                                },
                            }}
                        />
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>

        </>
    )
}
