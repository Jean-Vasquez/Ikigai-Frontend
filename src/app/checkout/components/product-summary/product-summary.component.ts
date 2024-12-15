import { Component, OnInit } from '@angular/core';
import { productoDetalle } from '../../../products/interfaces/response/respuesta-detalle.interface';
import { CheckoutService } from '../../services/Checkout.service';

@Component({
  selector: 'checkout-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrl: './product-summary.component.css'
})
export class ProductSummaryComponent implements OnInit{

  public producto : productoDetalle[] = []


  constructor(private checkoutService : CheckoutService){}

  ngOnInit(): void {
    this.cargarProducto()    
  }
 

  cargarProducto(){
    this.checkoutService.cargarProducto().subscribe({
      next: (value) => {
        this.producto.push(value)
      }
    })
  } 


}
