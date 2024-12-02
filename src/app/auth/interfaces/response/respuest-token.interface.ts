import { datosLogin } from "../data/datos-login.interface";

export interface respuestaToken {
    user:  datosLogin;
    token: string;
}


