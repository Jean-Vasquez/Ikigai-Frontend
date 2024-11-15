import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/Auth.service';
import { datosPersona } from '../../../auth/interfaces/datosPersona';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {



  constructor(
    private authService:AuthService
  ){}

  private cartItems : any[] = []
  
  private userData : datosPersona[] = []

public getCart(): any{
  return this.cartItems = this.getCart()
}

}
