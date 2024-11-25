
import { Component  } from '@angular/core';
import { UserRegister } from '../../interfaces/user.interface';
import { AuthService } from '../../services/Auth.service';
@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  //injección del servicio
  constructor(
    private readonly authSevice: AuthService
  ){}
//crear un objeto vacío para almacenar el usuario que se va a registrar
  usuario: UserRegister = {
    nombres: '',
    apellidos: '',
    tipodoc: '',
    numerodoct: '',
    fechanaci: '',
    direccion: '',
    correo: '',
    telefono: '',
  }
//envía el usuario al servicio
  enviarUser(): void {
    this.authSevice.datosUser(this.usuario)
  }
}
