import { Component, OnInit } from '@angular/core';
import { productoDetalle } from '../../../products/interfaces/response/respuesta-detalle.interface';
import { CheckoutService } from '../../services/Checkout.service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ProductsService } from '../../../products/services/Products.service';

@Component({
  selector: 'checkout-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrl: './product-summary.component.css'
})
export class ProductSummaryComponent implements OnInit{

  public producto : productoDetalle[] = []
  public contador : number = 1
  public maxContador : number|undefined

  constructor(private checkoutService : CheckoutService, private router: Router){}

  ngOnInit(): void {
  /* this.cargarProducto()     */
  this.cargarCarrito()
  }
 

  cargarProducto(){
    if(!localStorage.getItem('compra')){
      this.cargarCarrito()
      
    }
    this.checkoutService.cargarProducto().subscribe({
      next: (value) => {
        this.producto.push(value),
        this.maxContador = value.stock
        if(localStorage.getItem('stock')){
        const stock = JSON.parse(localStorage.getItem('stock')!)
        this.contador = stock
        }
      }
    })
    
  } 

  cargarCarrito(){
    const productos = localStorage.getItem('cart')
    console.log(productos)
    this.producto.push(JSON.parse(productos!))
  }

  aumentarEn(){
    if(this.maxContador! > this.contador ){
      localStorage.removeItem('stock')
      this.contador+= 1
      const contadorStorage = JSON.stringify(this.contador)
      localStorage.setItem('stock',contadorStorage)
    }
  }

  disminuirEn(){

    if(this.contador>1){
      localStorage.removeItem('stock')
    this.contador-=1
      const contadorStorage = JSON.stringify(this.contador)
      localStorage.setItem('stock',contadorStorage)
    }
  }

  eliminarProducto(){
    
    if(localStorage.getItem('compra')){
      this.checkoutService.eliminarProducto()
      this.router.navigateByUrl('products/product-list') 
    }
    
    
  }


}
