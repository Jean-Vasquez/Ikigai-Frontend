import { CanActivateFn, Router} from '@angular/router';
import { NotFoundError } from 'rxjs';
import { datosPersona } from '../interfaces';
import { datosUsuario } from '../interfaces/data/datos-usuario.interface';
import { inject } from '@angular/core';


export const rolGuard: CanActivateFn = (route, state) => {
  
    const datosPersona = localStorage.getItem('persona')
    if(!datosPersona){
        alert(`Necesitas iniciar sesión para poder acceder`)
        return false
    }
    try {
        const {rol} :datosUsuario = JSON.parse(datosPersona)
        if(rol == 'administrador'){
        console.log('Tienes permiso para esta ruta')
        return true
        }
    } catch (error) {
        alert(`Ocurrió un problema ${error}`)
        return false
    }

    alert(`No tienes los permiso para acceder a esta ruta`)
    console.log('Necesitas ser administrador')
    const router = inject(Router)

    router.navigateByUrl(`/home`)
    
    return false
};
