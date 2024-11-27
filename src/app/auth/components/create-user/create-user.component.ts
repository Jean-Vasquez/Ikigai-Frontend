import { Component } from '@angular/core';
import { AuthService } from '../../services/Auth.service';
import { datosUsuario } from '../../interfaces/data/datos-usuario.interface';


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
    usuario: datosUsuario = {
      usuario: '',
      contrasena: '',
      rol: 'cliente',
      idpersona: {
        nombres: '',
        apellidos: '',
        tipodoc: '',
        numerodoct: '',
        fechanaci: new Date(),
        direccion: '',
        correo: '',
        telefono: '',  
      }
    }
//envía los datos al servicio
    createUser(){
    this.authService.datosUsuario(this.usuario); 
    }

  }

  

