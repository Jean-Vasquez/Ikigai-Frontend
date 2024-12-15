import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environments';
import { productoDetalle } from '../../products/interfaces/response/respuesta-detalle.interface';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../products/interfaces/response/respuesta-productos.interface';
import { Observable, throwError } from 'rxjs';
import { ProductsService } from '../../products/services/Products.service';
import { AuthService } from '../../auth/services/Auth.service';
import { respuestaUsuario } from '../../auth/interfaces';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService implements OnInit{

  constructor(private http: HttpClient, private productsService : ProductsService) {}

   public baseUrl = environment.baseURL

   public producto : productoDetalle[] = []

   public usuario : [] = []


  ngOnInit(){
    this.cargarProducto()

  }

  cargarProducto(): Observable<productoDetalle>{
      const id = localStorage.getItem('compra')
      return this.productsService.getProductById(id!)
  }



   }




