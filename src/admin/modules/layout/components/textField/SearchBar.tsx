import { Box, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

export const SearchBar = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end', background: '#ffffff', padding: '16px', height: '37px', borderRadius: '25px' }}>
            <Search sx={{ color: 'action.active', marginBottom: '5px' }} />
            <TextField
                id="input-with-sx"
                label="Búsqueda"
                variant="standard"
                sx={{
                    width: '100%',
                    border: 0,
                    '& .MuiInput-underline:before': { borderBottom: 'none' },
                    '& .MuiInput-underline:after': { borderBottom: 'none' },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                }}
            />
        </Box>
    );
};
