
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { datosPersona } from '../../interfaces/datosPersona';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  /*------------------- JEAN----------------------------- */
  dataPersona : datosPersona = {
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

  constructor(private router : Router){}


  DatosTemp(){
    const temporal: Partial<datosPersona>={
      nombres : this.dataPersona.nombres,
      apellidos : this.dataPersona.apellidos,
      direccion : this.dataPersona.direccion,
      correo : this.dataPersona.correo,
      tipodoct : this.dataPersona.tipodoct,
      numerodoct : this.dataPersona.numerodoct,
      fechanaci : this.dataPersona.fechanaci,
      telefono : this.dataPersona.telefono
    }
    localStorage.setItem('temporal',JSON.stringify(temporal))
    this.router.navigate(['/crear-usuario'])

  }
  /*------------------- JEAN----------------------------- */
}
