import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { estadoLogin } from '../interfaces';

export const publicGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService)
  const routes = inject(Router)
     
  if(authService.estadoLogin() ===estadoLogin.autenticado){
    console.log(`Autenticado Guard`)
    return true;
  } 

  if(authService.estadoLogin() === estadoLogin.comprobando){
    console.log(`Comprobando Guard`)
    return false 
  }


  console.log('Necesitas iniciar sesión')

  const url = state.url;
  localStorage.setItem('path', url);  
  routes.navigateByUrl(`/auth/login`) 
  return false;
  
};
