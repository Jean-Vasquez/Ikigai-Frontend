import { datosPersona } from "./datos-persona.interface";

export interface datosUsuario {
    usuario:    string;
    contrasena: string;
    idpersona:  datosPersona;
    rol:        string;
}


