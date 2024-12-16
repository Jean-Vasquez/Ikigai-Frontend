import { Idpersona } from "./respuesta-dataPersona.interface";

export interface configUser {
    _id:       string;
    usuario:   string;
    idpersona: Idpersona;
    rol:       string;
    __v:       number;
}
