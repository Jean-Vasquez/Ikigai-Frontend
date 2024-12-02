import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { estadoLogin } from '../interfaces';

export const publicGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService)
  const router = inject(Router)
     
   if(authService.estadoLogin() == estadoLogin.autenticado ){
      return true;
  } 

  if(authService.estadoLogin() == estadoLogin.comprobando){
    return false 
  }

  /*
  const url = state.url;
  localStorage.setItem('path', url);  
  routes.navigateByUrl(`/auth/login`) 
  return false; */
  router.navigateByUrl(`/auth/login`)

  return false
  
};
