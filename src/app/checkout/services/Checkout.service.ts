import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environments';
import { productoDetalle } from '../../products/interfaces/response/respuesta-detalle.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../../products/interfaces/response/respuesta-productos.interface';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { ProductsService } from '../../products/services/Products.service';
import { AuthService } from '../../auth/services/Auth.service';
import { respuestaUsuario } from '../../auth/interfaces';
import { DatosVenta } from '../interfaces/data/dataVenta.interface';
import { datosCarrito } from '../../products/interfaces/data/datos-carrito.interface';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService implements OnInit{

  constructor(private http: HttpClient, private productsService : ProductsService) {}

   public baseUrl = environment.baseURL
   
   private cartItems: datosCarrito[] = [];
   

  
  ngOnInit(){
    /* this.cargarProducto()  */
    this.cargarCarrito()
  }

  cargarProducto(): Observable<productoDetalle>{
      
    if(!localStorage.getItem('compra')){  return EMPTY }
    const id = localStorage.getItem('compra')
      return this.productsService.getProductById(id!)

  }

  cargarCarrito(){
    const carrito = localStorage.getItem('cart')
    if(carrito){
      this.cartItems = JSON.parse(carrito)
    }
    localStorage.setItem('cart',JSON.stringify(this.cartItems))
  }

  eliminarProducto(){
    localStorage.removeItem('compra')
  }


  realizarVenta(venta: DatosVenta){

    const token = localStorage.getItem('token')

    const headers = new HttpHeaders().
    set('Authorization', `Bearer ${token}`)
    return this.http.post(`${this.baseUrl}/venta`, venta, {headers} )

  }


  ifCart(){
    const data = localStorage.getItem('cart')
    return data
  }

   }




