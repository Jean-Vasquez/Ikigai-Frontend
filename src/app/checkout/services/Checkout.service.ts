import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environments';
import { productoDetalle } from '../../products/interfaces/response/respuesta-detalle.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../../products/interfaces/response/respuesta-productos.interface';
import { Observable, throwError } from 'rxjs';
import { ProductsService } from '../../products/services/Products.service';
import { AuthService } from '../../auth/services/Auth.service';
import { respuestaUsuario } from '../../auth/interfaces';
import { DatosVenta } from '../interfaces/data/dataVenta.interface';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService implements OnInit{

  constructor(private http: HttpClient, private productsService : ProductsService) {}

   public baseUrl = environment.baseURL

   

   

  
  ngOnInit(){
    this.cargarProducto()

  }

  cargarProducto(): Observable<productoDetalle>{
      const id = localStorage.getItem('compra')
      return this.productsService.getProductById(id!)
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





   }




