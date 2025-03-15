import { FormControlLabel, styled, Switch, SwitchProps } from "@mui/material";
import { NightsStay, WbSunny } from "@mui/icons-material";
import { useState } from "react";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
    width: 67,
    height: 39,
    padding: 0,
    position: "relative",
    "& .MuiSwitch-switchBase": {
        padding: 4,
        margin: 3,
        transitionDuration: "300ms",
        backgroundColor: "#000000 !important", // Mantiene el fondo blanco del círculo
        "&.Mui-checked": {
            transform: "translateX(28px)",
            "& + .MuiSwitch-track": {
                backgroundColor: "#ffffff",
                opacity: 1,
                border: 0,
            },
        },
    },
    "& .MuiSwitch-thumb": {
        width: 28,
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        "& svg": {
            position: "absolute",
            fontSize: 18, // Tamaño del icono
        },
    },
    "& .MuiSwitch-track": {
        borderRadius: 55 / 2,
        backgroundColor: "#ffffff",
        opacity: 1,
        transition: theme.transitions?.create?.(["background-color"], {
            duration: 500,
        }) || "none",
    },
}));

export const ThemeSwitch = () => {
    const [checked, setChecked] = useState(true);

    return (
        <FormControlLabel
        control={
            <IOSSwitch
            sx={{ m: 1 }}
            checked={checked}
            onChange={() => setChecked(!checked)}
            icon={<WbSunny style={{ color: "#FFD700" }} />}
            checkedIcon={<NightsStay style={{ color: "#FFD700" }} />}
            />
        }
        label=""
        />
    );
};
