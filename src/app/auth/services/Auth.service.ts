import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, filter, map, Observable, of, tap, throwError } from 'rxjs';
;
import { environment } from '../../../environments/environments';
import { estadoLogin, LoginRespuesta, User } from '../interfaces';


import { UserRegister } from '../../auth/interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rutas = ['/iniciar-sesion','/registrar-cliente','/crear-usuario']

    public mostrarNavFooter = false
  
     private  baseUrl : string = environment.baseURL
    private http = inject(HttpClient)

    
    private _usuario= signal<User|null>(null)
    private _estadoLogin = signal<estadoLogin>(estadoLogin.comprobando)
    

    
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
      }),
      map( ()=> true),

      
      catchError( err => throwError (() => err.error.message)
      )
    )

    
  }
  
  //creación de variables para datos del usuario

  user!: UserRegister;
  persona!: any;
  datosUser(usuario: UserRegister){
    this.user = usuario
  }
//creación de variables para datos de una persona
  datosPersona(usuario: any) {
    this.persona = usuario
    this.persona.idpersona = this.user
    this.registrar();
  }
//para enviar los datos al api
  async registrar(){
    const url = `${this.baseUrl}/usuario/registro`
    const result = await this.http.post<any>(url, this.persona).toPromise()
  }
 







      
/*     constructor(private router:Router,) { 

this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(()=>{
      this.mostrarNavFooter = this.rutas.includes(this.router.url)
    }) 
  }
 */


}
