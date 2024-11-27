
import { Component  } from '@angular/core';
import { datosPersona} from '../../interfaces/data/datos-persona.interface';
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
  persona: datosPersona = {
    nombres: '',
    apellidos: '',
    tipodoc: '',
    numerodoct: '',
    fechanaci: new Date(),
    direccion: '',
    correo: '',
    telefono: '',
  }
//envía el usuario al servicio
  createPerson(): void {
    this.authSevice.datosPersona(this.persona)
    console.log(`Component: ${this.persona}`)
  }
}
