import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, filter, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
import { estadoLogin, LoginRespuesta, User } from '../interfaces';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rutas = ['/auth/login','/auth/register','/auth/create-user']

    public mostrarNavFooter = false
  
    private  baseUrl : string = environment.baseURL
    private http = inject(HttpClient)
    
    
    private _usuario= signal<User|null>(null)
    private _estadoLogin = signal<estadoLogin>(estadoLogin.comprobando)

            
    constructor(private router:Router,) { 
      this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
          ).subscribe(()=>{
            this.mostrarNavFooter = this.rutas.includes(this.router.url)
          }) 
        }
      


    
    public usuario = computed( ()=> this._usuario);
    
    public estadoLogin = computed(() => this._estadoLogin);

    
  login(usuario:string, contrasena:string): Observable<boolean>{
    
    const url = `${this.baseUrl}/usuario/login`
    const body = {usuario, contrasena};

    return  this.http.post<LoginRespuesta>(url,body)
    .pipe(
      tap( ({user, token}) => {
        this._usuario.set(user);
        this._estadoLogin.set(estadoLogin.autenticado)
        localStorage.setItem('token', token)
        console.log({user,token})
      }),
      map( ()=> true),

      
      catchError( err => throwError (() => err.error.message)
      )
    )
   
    
  }
  
 










}
