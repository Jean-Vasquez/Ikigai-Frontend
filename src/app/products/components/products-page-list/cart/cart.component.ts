import { Component } from '@angular/core';
import { ProductsService } from '../../../services/Products.service';
import { datosCarrito } from '../../../interfaces/data/datos-carrito.interface';


@Component({
  selector: 'products-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  public maxContador : number|undefined
  cartItems: datosCarrito[] = [];
  public contador: number = 1
  constructor(private productService: ProductsService) {
    this.getItems()
  }
  
  getItems(){
    this.cartItems = this.productService.getCartItems()
  }

  borrarCarritos(){
    this.productService.borrarCarritos()
    this.getItems()
  }

  borrarProducto(id:string){
    this.productService.borrarProductoCarrito(id)
    this.getItems()
  }

  incrementarEn(carrito: datosCarrito){
    this.productService.agregarCarrito(carrito)
    this.getItems()
  }

  decrementarEn(){
    this.cartItems.map((cant) => {
      cant.cantidad--
    })
  }
  
  navegarCheckout(){
    this.productService.navegarCheckout()
  }






}