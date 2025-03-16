// SideBarItem.tsx
import { FC, ReactNode } from 'react';
import { ListItem, ListItemIcon } from "@mui/material";

interface SideBarItemProps {
    isActive: boolean;
    icon: ReactNode;
    onClick: any;
}

const SideBarItem: FC<SideBarItemProps> = ({ isActive, icon, onClick }) => {
    return (
        <ListItem
            sx={{
                justifyContent: "center"
                ,width: "70px"
                ,height: "70px"
                ,backgroundColor: isActive ? "black" : "transparent"
                ,color: isActive ? "green" : "inherit"
                ,borderRadius: "40px"
                ,margin: "0 auto"
                ,marginBottom: "10px"
                ,"&:hover": {
                    backgroundColor: "black",
                    "& .MuiListItemIcon-root": {
                        color: "#aaef62",                        
                    }
                    ,transition: "all ease .3s"
                }
                ,"& .MuiListItemIcon-root": {
                    color: "#aaef62",
                }
                ,transition: "all ease .3s"
            }}
            className={ isActive ? "active" : "" }
        >
            <ListItemIcon
                sx={{
                    minWidth: "auto",
                    "&:hover": {
                        color: "#aaef62",  // Cambiar a verde cuando se hace hover
                    },
                    "&.active": {
                        color: "#aaef62",  // Cambiar a verde cuando el item es activo
                    },
                }}
                onClick={ onClick }
            >
                {icon}
            </ListItemIcon>
        </ListItem>
    );
}

export default SideBarItem;
