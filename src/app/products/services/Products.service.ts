import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { productsNewArray } from '../interfaces/productsNewArray';
import { respuestaProductos } from '../interfaces/respuestaProductos';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { paginacionProductos } from '../interfaces/paginacion-Productos';
import { datosProductos } from '../interfaces/datos-productos.interface';
import { respuestaPrueba } from '../interfaces/respuesta-prueba.interface';
import { NewProduts } from '../interfaces/new-product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: respuestaProductos[] = []; // Usa productsListArray para almacenar todos los detalles

  private baseUrl = `${environment.baseURL}/producto`; //url para conexion con la bd

  constructor(private http: HttpClient) {
      // Cargar el carrito si es necesario
  }

 /*----------CRUD PRODUCTOOO---------------*/

  // Obtener todos los productos
  getProducts(): Observable<paginacionProductos> {
    
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGNjOTRlZmJiNDJkZjA0NjQ1ODAzMCIsInJvbCI6ImFkbWluaXN0cmFkb3IiLCJpYXQiOjE3MzMxMDAwMjUsImV4cCI6MTczMzEyMTYyNX0.r2157L8ysokAKv7qI5bsJQaDyDUPDSCvSkHXsJO7vLk'

    const headers = new HttpHeaders().
    set('Authorization', `Bearer ${token}`)

    return this.http.get<paginacionProductos>(this.baseUrl,{headers});

    
  }
  

   // Crear un nuevo producto
   addProduct(product: datosProductos): Observable<respuestaPrueba> { 
    
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGNjOTRlZmJiNDJkZjA0NjQ1ODAzMCIsInJvbCI6ImFkbWluaXN0cmFkb3IiLCJpYXQiOjE3MzMxMDAwMjUsImV4cCI6MTczMzEyMTYyNX0.r2157L8ysokAKv7qI5bsJQaDyDUPDSCvSkHXsJO7vLk'

    const headers = new HttpHeaders().
    set('Authorization', `Bearer ${token}`)

    return this.http.post<respuestaPrueba>(this.baseUrl, product, {headers})


    
  }

  // Obtener producto por ID
  getProductById(id: string): Observable<respuestaProductos> {
    return this.http.get<respuestaProductos>(`${this.baseUrl}/${id}`);
  }

  //Actualizar un producto
  async updateProducto(id: string, product: respuestaProductos){
    const {_id, ...updateProducto} = product;

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGNjOTRlZmJiNDJkZjA0NjQ1ODAzMCIsInJvbCI6ImFkbWluaXN0cmFkb3IiLCJpYXQiOjE3MzMxMDAwMjUsImV4cCI6MTczMzEyMTYyNX0.r2157L8ysokAKv7qI5bsJQaDyDUPDSCvSkHXsJO7vLk'

    const headers = new HttpHeaders().
    set('Authorization', `Bearer ${token}`)


    return await this.http.patch<respuestaProductos>(`${this.baseUrl}/${id}`, updateProducto, {headers}).toPromise();
  }


  private loadProducts(): void {
    this.getProducts().subscribe(
      (resp) =>{
        this.products = resp.productos;
      }, (error) => {
        console.error('Error al cargar los productos desde el servidor', error);
      }
    );
  }

   // Eliminar un producto por ID
   deleteProduct(_id: string): Observable<void> {

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGNjOTRlZmJiNDJkZjA0NjQ1ODAzMCIsInJvbCI6ImFkbWluaXN0cmFkb3IiLCJpYXQiOjE3MzMxMDAwMjUsImV4cCI6MTczMzEyMTYyNX0.r2157L8ysokAKv7qI5bsJQaDyDUPDSCvSkHXsJO7vLk'

    const headers = new HttpHeaders().
    set('Authorization', `Bearer ${token}`)

    return this.http.delete<void>(`${this.baseUrl}/${_id}`,{headers});
  }
  

async newAllProducts() {
  return await this.http.get<NewProduts[]>(`${this.baseUrl}/producto/nuevo`).toPromise();
} 

/* FALTA PAGINACION, BUSQUEDA  */

}