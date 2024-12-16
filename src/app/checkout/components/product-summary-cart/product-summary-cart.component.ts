import { Component, OnInit } from '@angular/core';
import { productoDetalle } from '../../../products/interfaces/response/respuesta-detalle.interface';
import { CheckoutService } from '../../services/Checkout.service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ProductsService } from '../../../products/services/Products.service';
import { datosProductCart } from '../../interfaces/data/dataProductoCart.interface';

@Component({
  selector: 'checkout-product-summary-cart',
  templateUrl: './product-summary-cart.component.html',
  styleUrl: './product-summary-cart.component.css'
})
export class ProductSummaryCartComponent implements OnInit{

  public producto : datosProductCart[] = []
  public contador : number = 1

  constructor(private checkoutService : CheckoutService, private router: Router){}

  ngOnInit(): void {
  this.cargarCarrito()
  }

  cargarCarrito(){
    const productos = localStorage.getItem('cart')
    console.log(productos)
    this.producto.push(JSON.parse(productos!))
  }


}
