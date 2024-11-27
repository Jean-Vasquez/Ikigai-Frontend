import { datosLogin } from "../data/datos-login.interface";

export interface respuestaLogin {
    user:  datosLogin;
    token: string;
}


