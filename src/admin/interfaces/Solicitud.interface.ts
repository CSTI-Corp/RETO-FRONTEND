export interface SolicitudInterface {
    id?             : number;
    codigo?         : number;
	tipoSolicitud   : string;
    marca           : string
	fechaEnvio      : string;
	numeroContacto  : string;
	nombreContacto  : string;
	success?		: boolean
	data?			: any;
}
