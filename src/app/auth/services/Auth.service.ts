import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
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

    
    private _usuario= signal<datosLogin|null>(null)
    private _estadoLogin = signal<estadoLogin>(estadoLogin.comprobando)
    private router = inject(Router)
            
    constructor() { 
      this.estadoCheckToken().subscribe()

      this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
          ).subscribe(()=>{
            this.mostrarNavFooter = this.rutas.includes(this.router.url)
          }) 


        }
      


    
    public usuario = computed( ()=> this._usuario());
    
    public estadoLogin = computed(() => this._estadoLogin());

    
  login(usuario:string, contrasena:string): Observable<boolean>{
    
    const url = `${this.baseUrl}/usuario/login`
    const body = {usuario, contrasena};

    return  this.http.post<respuestaLogin>(url,body)
    .pipe(
      tap( ({user, token}) => {
        this._usuario.set(user);
        this._estadoLogin.set(estadoLogin.autenticado)
        localStorage.setItem('token', token)
      }),
      map( ()=> 
      
      true
      
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

 estadoCheckToken(): Observable<boolean>{
  const url = `${this.baseUrl}/usuario/check-token`
  const token = localStorage.getItem('token') 
  
  if(!token){
    return of (false);
  } 

  const headers = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)

  return this.http.get<respuestaToken>(url,{headers})
  .pipe(
  map(({user, token}) => {
    this._usuario.set(user);
    this._estadoLogin.set(estadoLogin.autenticado)
    localStorage.setItem('token', token)
    return true 
  }),
  catchError(() =>{
    this._estadoLogin.set(estadoLogin.noAutenticado)
    
    return of(false)
  })
)
 }













}
