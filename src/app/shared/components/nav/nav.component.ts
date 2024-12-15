import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/Auth.service';
import { estadoLogin } from '../../../auth/interfaces';
import { Router } from '@angular/router';
import { datosUsuario } from '../../../auth/interfaces/data/datos-usuario.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent{


  
  public datosUsuario!: datosUsuario 
  

  getUsuario(){
    const user = localStorage.getItem('persona')

    if(!user){
        localStorage.removeItem('persona') 
        return 
      }
       this.datosUsuario = JSON.parse(user)
  }


  constructor(private authService: AuthService){
    this.getUsuario()
  }



  public cambiosLogin = effect(() =>{

    if(!localStorage.getItem('person')){
        return !this.datosUsuario
      }

      return false
    })


  public logout(){
    this.authService.logout()
  }  
  
}
