import { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import imgProfile from "../../img/iconProfile.svg";

export const ProfileButton = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                disableRipple
                sx={{
                    transition: "0.3s",
                    "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transform: "scale(1.05)",
                    }
                    ,"&:focus": {
                        backgroundColor: "transparent"
                    }
                }}
            >
                <img src={imgProfile} alt="Perfil" width="60" />
                <h5 style={{ margin: "0" }}> Boris Estrada </h5>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem onClick={handleMenuClose}>Mi Perfil</MenuItem>
                <MenuItem onClick={handleMenuClose}>Configuración</MenuItem>
            </Menu>
        </>
    );
};
