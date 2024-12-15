import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, filter, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { datosLogin, estadoLogin, respuestaLogin} from '../interfaces';


import { datosPersona} from '../interfaces/data/datos-persona.interface';
import { respuestaUsuario } from '../interfaces/response/respuesta-usuario.interface';
import { datosUsuario } from '../interfaces/data/datos-usuario.interface';
import {  respuestaToken } from '../interfaces/response/respuest-token.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private rutas = ['/auth/login','/auth/register','/auth/create-user']

  
    public mostrarNavFooter = false

  
    private  baseUrl : string = environment.baseURL
    private http = inject(HttpClient)
    private router = inject(Router)

   
            
    constructor() { 
      
      this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
          ).subscribe(()=>{
            this.mostrarNavFooter = this.rutas.includes(this.router.url)
          }) 
        }

    private setAutenticacion(user: datosLogin, token: string){
      localStorage.setItem('persona', JSON.stringify(user))
      localStorage.setItem('token', token)
      return true;
    }  
    
  login(usuario:string, contrasena:string): Observable<boolean>{
    
    const url = `${this.baseUrl}/usuario/login`
    const body = {usuario, contrasena};

    return  this.http.post<respuestaLogin>(url,body)
    .pipe(
      map(({user, token}) =>this.setAutenticacion(user,token)
    ),

      catchError( err => throwError (() => err.error.message)
      )
    )

    
  }
  

 //creación de variables para datos del usuario

 user!: datosUsuario;
 persona!: datosPersona;
 
 datosPersona(persona : datosPersona ){
     this.persona = persona
 }

 //para enviar los datos al api
 async registrar(usuario: datosUsuario): Promise<respuestaUsuario>{
   this.user = usuario
   this.user.idpersona = this.persona
   const url = `${this.baseUrl}/usuario`
   const result = await this.http.post<respuestaUsuario>(url, this.user
   ).toPromise()
   return result! 
 }

 logout(){
  localStorage.removeItem('token')
  localStorage.removeItem('persona')
  this.router.navigateByUrl('/auth/login')
}






}
