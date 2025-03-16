import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { Button, IconButton, List, ListItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router";

interface DashboardTableProps {
    rows: any[];
}

export const SolicitudTable = ({ rows }: DashboardTableProps) => {
    
    const navigate = useNavigate();

    const CustomExportButton = () => {
        return (
            <GridToolbarContainer>
                <Button
                    variant="contained"
                    // color="#ffffff"
                    // startIcon={<FileDownloadIcon />}
                    sx={{
                        textTransform: "none",
                        fontWeight: "700 !important",
                        color: "#ffffff !important",
                        backgroundColor: "#aaef62",
                        "&:hover": { backgroundColor: "#aaef62" },
                    }}
                >
                    <GridToolbarExport 
                        csvOptions={{
                            fileName: "solicitudes",
                            utf8WithBom: true,
                            delimiter: ";", // "," - ";"
                        }}
                    />
                </Button>
            </GridToolbarContainer>
        );
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 }
        ,{ 
            field: 'codigo', 
            headerName: 'CÓDIGO', 
            width: 130, 
            renderCell: (params) => (
                <Link 
                    to={`/dashboard/solicitud/${params.row.id}`} 
                    style={{ textDecoration: "subrayed", color: "#8ccf46", fontWeight: "bold" }}
                >
                    {params.value}
                </Link>
            )
        }
        ,{ field: 'marca', headerName: 'MARCA', width: 130 }
        ,{ field: 'tipoSolicitud', headerName: 'TIPO SOLICITUD', width: 150 }
        ,{ field: 'fechaEnvio', headerName: 'FECHA ENVÍO', width: 130 }
        ,{
            field: "actions",
            headerName: "Acción",
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <List
                    sx={{
                        display: 'flex'
                        ,'& .MuiListItem-root': {
                            padding: 0
                            ,width: '40px'
                            ,marginRight: '5px'
                            ,borderRadius: '8px'
                        }
                        ,'& .MuiListItem-root:first-of-type': {
                            background: '#8dffa0'
                        }
                        ,'& .MuiListItem-root:nth-of-type(2)': {
                            background: 'red'
                        }
                        ,'& .MuiListItem-root:last-of-type': {
                            background: '#8ccf46'
                        }
                        
                    }}
                >
                    <ListItem>
                        <IconButton
                            onClick={ () => { navigate("/dashboard/solicitud/" + params.row.id ) }}
                            style={{ color: "#2e7d32"}}
                        >
                            <EditIcon />
                        </IconButton>
                    </ListItem>
                    {/* <ListItem>
                        <IconButton onClick={() => handleDeleteUser(params.row)} style={{ color: "#ffcdd2"}}> <DeleteIcon /> </IconButton>
                    </ListItem> */}
                    {/* <ListItem>
                        <IconButton onClick={() => handleDeleteUser(params.row)} style={{ color: "#ffffff"}}> <PersonAddIcon /> </IconButton>
                    </ListItem> */}
                </List>
            ),
        },
    ];   
    
    const paginationModel = { page: 0, pageSize: 5 };    

    return (
        <>
            <DataGrid
                rows={rows}
                columns={ columns }
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableRowSelectionOnClick 
                sx={{ border: 0 }}
                slots={{ toolbar: CustomExportButton }}
                localeText={{
                    noRowsLabel: 'No hay registros',
                    columnMenuSortAsc: 'Ordenar ascendente',
                    columnMenuSortDesc: 'Ordenar descendente',
                    columnMenuFilter: 'Filtrar',
                    columnMenuHideColumn: 'Ocultar columna',
                    columnMenuShowColumns: 'Mostrar columnas',
                    footerRowSelected: (count) => `${count} fila(s) seleccionada(s)`,
                    footerTotalRows: 'Total de filas:',
                    toolbarExport: 'Exportar',
                    toolbarDensity: 'Densidad',
                    toolbarColumns: 'Columnas',
                    toolbarFilters: 'Filtros',
                    toolbarExportCSV: 'Exportar a CSV',
                    // footerPaginationRowsPerPage: 'Filas por página', // 👈 Traducción de "Rows per page"
                    // paginationLabelDisplayedRows: ({ from, to, count }) => `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`,
                }}
            />
        </>
    )
}
