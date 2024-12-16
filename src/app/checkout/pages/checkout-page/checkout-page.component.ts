import { Component } from '@angular/core';
import { CheckoutService } from '../../services/Checkout.service';

@Component({
  selector: 'checkout-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent {
  constructor(private checkoutService: CheckoutService){}


  ifCart(){
    this.checkoutService.ifCart()
  }

} 
