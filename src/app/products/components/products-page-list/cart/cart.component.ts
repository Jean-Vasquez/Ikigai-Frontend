import { Component } from '@angular/core';
import { ProductsService } from '../../../services/Products.service';
import { datosCarrito } from '../../../interfaces/data/datos-carrito.interface';


@Component({
  selector: 'products-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  
  constructor(private productsService : ProductsService){
    this.cargarCarrito()
  }

  public carrito : datosCarrito[] = []


  agregarCarrito(data: datosCarrito){

    this.carrito.push(data)

    this.productsService.agregarCarrito(this.carrito)

    this.cargarCarrito()

  }

  cargarCarrito(){
    this.productsService.cargarCarrito()
  }
}