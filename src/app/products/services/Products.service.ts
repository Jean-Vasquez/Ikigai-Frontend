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
import { AuthService } from '../../auth/services/Auth.service';
import { Producto, respuestaProductosCliente } from '../interfaces/response/respuesta-productos.interface';
import { productoDetalle } from '../interfaces/response/respuesta-detalle.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: respuestaProductos[] = []; // Usa productsListArray para almacenar todos los detalles

  private baseUrl = `${environment.baseURL}/producto`; //url para conexion con la bd

  constructor(private http: HttpClient, private authService: AuthService) {
      
  }

 /*----------CRUD PRODUCTOOO---------------*/

  // Obtener todos los productos Administrador
  getProducts(): Observable<paginacionProductos> {
    
    const token = localStorage.getItem('token') 
    const headers = new HttpHeaders().
    set('Authorization', `Bearer ${token}`)

    return this.http.get<paginacionProductos>(this.baseUrl,{headers});

    
  }
  

   // Crear un nuevo producto
   addProduct(product: datosProductos): Observable<respuestaPrueba> { 
   
   
    const token = localStorage.getItem('token') 
  
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
  

    return this.http.post<respuestaPrueba>(this.baseUrl, product, {headers})
    
  }

 
  getProductById(id: string): Observable<productoDetalle> {
    return this.http.get<productoDetalle>(`${this.baseUrl}/${id}`);
  }


  async updateProducto(id: string, product: respuestaProductos){
    const {_id, ...updateProducto} = product;

    const token = localStorage.getItem('token') 
    const headers = new HttpHeaders().
    set('Authorization', `Bearer ${token}`)


    return await this.http.patch<respuestaProductos>(`${this.baseUrl}/${id}`, updateProducto, {headers}).toPromise();
  }



   deleteProduct(_id: string): Observable<void> {

    const token = localStorage.getItem('token') 
    const headers = new HttpHeaders().
    set('Authorization', `Bearer ${token}`)

    return this.http.delete<void>(`${this.baseUrl}/${_id}`,{headers});
  }
  

async newAllProducts() {
  return await this.http.get<NewProduts[]>(`${this.baseUrl}/nuevo`).toPromise();
} 



  // Obtener todos los productos
  getProductsCliente(): Observable<respuestaProductosCliente> {
    
    return this.http.get<respuestaProductosCliente>(`${this.baseUrl}/cliente`);

    
  }
  
 


  compraProd(id:string){

    if(localStorage.getItem('compra')){
      localStorage.removeItem('compra')
    }
    localStorage.setItem('compra', id)
  }


}