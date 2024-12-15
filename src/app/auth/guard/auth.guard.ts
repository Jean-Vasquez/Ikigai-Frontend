import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { estadoLogin } from '../interfaces';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
     
   
  if(!localStorage.getItem('persona')){
    const url = state.url;
  localStorage.setItem('path', url);  
  console.log('Tienes que iniciar sesión')
  router.navigateByUrl(`/auth/login`) 
  return false
  }

  console.log('Está iniciado sesión')
  return true 

    
};
