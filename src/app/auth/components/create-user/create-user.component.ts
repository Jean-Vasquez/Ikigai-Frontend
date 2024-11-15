import { Component } from '@angular/core';
import { datosPersona } from '../../interfaces/datosPersona';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {


/*------------------- JEAN----------------------------- */
  dataPersona: datosPersona={
    nombres: '',
    apellidos: '',
    direccion: '',
    correo: '',
    tipodoct: '',
    numerodoct: '',
    fechanaci: '',
    telefono: '',
    usuario:'',
    contrasena:''
  }

  constructor(private router: Router, private authservice: AuthService){}

    DatosFijos(){
      const temporal = JSON.parse(localStorage.getItem('temporal') || '{}' )
      const arrayPersona: datosPersona={
        ...temporal,
        usuario: this.dataPersona.usuario,
        contrasena: this.dataPersona.contrasena
      }

      this.authservice.saveUsuario(arrayPersona)

      localStorage.removeItem('temporal')
      this.router.navigate(['/iniciar-sesion']);
    }
  }

  




/*------------------- JEAN----------------------------- */




