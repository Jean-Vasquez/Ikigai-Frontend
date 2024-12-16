export interface DatosVenta {
    usuario:      string;
    metpago:      string;
    detalleVenta: DetalleVenta[];
}

export interface DetalleVenta {
    cantidadprod: number;
    idproducto:   string;
}
