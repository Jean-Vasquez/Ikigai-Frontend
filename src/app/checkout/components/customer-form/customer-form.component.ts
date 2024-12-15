import { Component } from '@angular/core';
import { CheckoutService } from '../../services/Checkout.service';
import { respuestaUsuario } from '../../../auth/interfaces';

@Component({
  selector: 'checkout-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {

  

  constructor(private checkoutService: CheckoutService){}

  


}
