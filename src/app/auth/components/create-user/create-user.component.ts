import { Component } from '@angular/core';
import { AuthService } from '../../services/Auth.service';


@Component({
  selector: 'auth-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  //ineccion del servicio al constructor
  constructor(
    private readonly authService: AuthService
  ) { }
//creación de objeto vacía (persona)
    persona: any = {
      usuario: '',
      contrasena: '',
      rol : "administrador",
      idpersona: {
        nombres: '',
        apellidos: '',
        tipoDocumento: '',
        numerodoct: '',
        fechanaci: '',
        direccion: '',
        correo: '',
        telefono: '',  
      }
    }
//envía los datos al servicio
    register(){
    this.authService.datosPersona(this.persona); 
    }

  }

  

