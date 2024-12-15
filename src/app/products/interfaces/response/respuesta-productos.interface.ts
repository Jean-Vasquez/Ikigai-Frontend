export interface respuestaProductosCliente {
    productos:       Producto[];
    totalDocumentos: number;
}

export interface Producto {
    _id:       string;
    nombre:    string;
    imagen:    string;
    categoria: Categoria;
    precio:    number;
    stock: string
}

export enum Categoria {
    Accesorios = "accesorios",
    Cuadros = "cuadros",
    Peluches = "peluches",
}
