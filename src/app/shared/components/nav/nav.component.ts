import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/Auth.service';
import { SharedService } from '../../services/shared.service';
import { datosUsuario } from '../../../auth/interfaces/data/datos-usuario.interface';
import { estadoLogin } from '../../../auth/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent{

  private authService = inject(AuthService)
  public user = computed(() =>this.authService.usuario());
  private router = inject(Router)


  public verificarLogin = computed<boolean>( () => {

    if(this.authService.estadoLogin() === estadoLogin.comprobando){
      return false
    }
    if(this.authService.estadoLogin() === estadoLogin.noAutenticado){
      return false
    }
    
    
    return true
  })

  public cambiosEstado = effect (() => {
    
    switch(this.authService.estadoLogin()){

      case estadoLogin.comprobando:
        console.log(`Comprobando switch`)
        return;

      case estadoLogin.autenticado:
        console.log(`autenticado switch`)    
        return; 

      case estadoLogin.noAutenticado:
        console.log(`No autenticado switch`)
        return;
    }

  })


  

}
