import { respuestaProductos } from "./respuestaProductos";

export interface paginacionProductos {
    productos:       respuestaProductos[];
    totalDocumentos: number;
}
