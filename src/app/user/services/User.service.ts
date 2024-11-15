import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/Auth.service';
import { datosPersona } from '../../auth/interfaces/datosPersona';
import { usuario } from '../interfaces/usuario';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  private cliente: datosPersona[] = []

  public getUser():Observable<usuario[]>{
    const data:usuario[]= this.cliente.map( i =>({
      usuario: i.usuario
    }))
    
    const finalUser = data.reverse().slice(0,1)
    return of (finalUser)
  }
}

