import {  Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { respuestaProductos } from '../interfaces/respuestaProductos';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { paginacionProductos } from '../interfaces/paginacion-Productos';
import { datosProductos } from '../interfaces/datos-productos.interface';
import { respuestaPrueba } from '../interfaces/respuesta-prueba.interface';
import { NewProduts } from '../interfaces/new-product';
import { AuthService } from '../../auth/services/Auth.service';
import { respuestaProductosCliente } from '../interfaces/response/respuesta-productos.interface';
import { productoDetalle } from '../interfaces/response/respuesta-detalle.interface';
import { datosCarrito } from '../interfaces/data/datos-carrito.interface';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  private baseUrl = `${environment.baseURL}/producto`; //url para conexion con la bd

  private cartItems: datosCarrito[] = [];

  constructor(private http: HttpClient,private router : Router) {
  this.cargarProductos()
  }

 

 
  getProducts(): Observable<paginacionProductos> {
    
    const token = localStorage.getItem('token') 
    const headers = new HttpHeaders().
    set('Authorization', `Bearer ${token}`)

    return this.http.get<paginacionProductos>(this.baseUrl,{headers});

    
  }
  

 
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



  getProductsCliente(): Observable<respuestaProductosCliente> {
    
    return this.http.get<respuestaProductosCliente>(`${this.baseUrl}/cliente`);

    
  }
  
 


  compraProd(id:string, stock: number){



    if(localStorage.getItem('compra') && localStorage.getItem('stock')){
      localStorage.removeItem('compra')
      localStorage.removeItem('stock')
    }
    const stockStorage = JSON.stringify(stock)
    localStorage.setItem('stock',stockStorage)
    localStorage.setItem('compra', id)
  
  }


  agregarCarrito(datos: datosCarrito){

    const id = this.cartItems.find(x => x._id === datos._id)
    if(id){
      console.log(id.stock)
      if(id.stock > id.cantidad){
      id.cantidad++ 
      }
    }else{
      this.cartItems.push(datos)
    }
    
    this.saveStorage()
    
  }

  saveStorage(){
    localStorage.setItem('cart', JSON.stringify(this.cartItems))
  }

  cargarProductos(){
    const carrito = localStorage.getItem('cart')
    if(carrito){
      this.cartItems = JSON.parse(carrito)
    }
    this.saveStorage()
  }
  

  getCartItems(){
    return this.cartItems
  }

  borrarCarritos(){
    this.cartItems = []
    this.saveStorage()
  }

  borrarProductoCarrito(id:string){
    this.cartItems = this.cartItems.filter(x => x._id !== id)
    this.saveStorage()
  }

  navegarCheckout(){
    localStorage.removeItem('stock')
    localStorage.removeItem('compra')
    this.router.navigateByUrl('checkout/overview')
  }
}