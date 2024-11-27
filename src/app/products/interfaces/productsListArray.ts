export type ProductWithoutId = Omit<productsListArray, '_id'>;

export interface productsListArray {
    
    _id:string
    nombre: string
    imagen: string
    categoria: string
    descripcion: string
    presentacion:string
    precio: number
    stock:number
}