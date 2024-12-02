import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { estadoLogin } from '../interfaces';
import { environment } from '../../../environments/environments';

export const privateGuard: CanActivateFn = (route, state) => {
  


  
  const authService = inject(AuthService)
  const routes = inject(Router)
  if(authService.estadoLogin() === estadoLogin.autenticado){
    routes.navigateByUrl(`/home`)
    return false;
  } 


  return true;
  

  
};
