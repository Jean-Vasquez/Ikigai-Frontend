import { Component } from '@angular/core';
import { CheckoutService } from '../../services/Checkout.service';
import { respuestaUsuario } from '../../../auth/interfaces';
import { UserService } from '../../../user/services/User.service';
import { configUser } from '../../../user/interfaces/usuario';

@Component({
  selector: 'checkout-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {

  public id : string = ''
  public dataUsuario : configUser[] = []
  constructor(private userService: UserService){}

  traerDatos(){
      this.userService.datosUsuario().subscribe({
        next: (value) => {
          this.id = value._id
        },
      })

      if(this.id !== ''){
        this.userService.buscardDatos(this.id).subscribe({
          next: (value) => {
            this.dataUsuario.push(value)
          },
        })
      }
  }

}
