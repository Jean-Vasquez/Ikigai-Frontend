import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { datosPersona } from '../interfaces/datosPersona';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rutas = ['/iniciar-sesion','/registrar-cliente','/crear-usuario']

    public mostrarNavFooter = false
  constructor( private http: HttpClient, private router:Router) { 

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(()=>{
      this.mostrarNavFooter = this.rutas.includes(this.router.url)
    })

  }


  private jsonUrl='../../../../assets/users/users.json'  
  private localStorageKey = 'combinedData';

  getCredenciales(): Observable<any>{
    return this.http.get<any>(this.jsonUrl)
  }

/* ------------------------------------------- */

  private key = "cliente"
   userLogin?:datosPersona


   /* Obtiene los datos del localStorage o un array vacío
   para los DatosPersona[] */
  getUsuarioStorage():datosPersona[]{
    const storageData = localStorage.getItem(this.key)
    return storageData ? JSON.parse(storageData) : []
  }

  /* Asigna a data el valor del array, luego 
  introduce dataPersona que será la nueva persona, y luego
  lo guarda en el localStorage */
  saveUsuario(dataPersona:datosPersona){
    const data = this.getUsuarioStorage();
    data.push(dataPersona)    
    localStorage.setItem(this.key,JSON.stringify(data))
    
  }


  login(usuario:string, contrasena: string):boolean{
    const user = this.getUsuarioStorage()
    const userF =user.find(x => x.usuario === usuario && x.contrasena === contrasena) 
    this.userLogin = userF
    return !!userF
  }

  /* Remueve el temporal del inicio de sesion del localStorage */
  logout(){
    localStorage.removeItem(this.key)
  }


}
