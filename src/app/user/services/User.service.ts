import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { configUser } from '../interfaces/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUrl = environment.baseURL
  constructor(private http: HttpClient) { 
    this.datosUsuario()
  }
  

  datosUsuario():Observable<configUser>{

    const token = localStorage.getItem('token')

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)

    return this.http.get<configUser>(`${this.baseUrl}/usuario`, {headers})
  }


  buscardDatos(id:string): Observable<configUser>{
    const token = localStorage.getItem('token')

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    return this.http.get<configUser>(`${this.baseUrl}/usuario/data/${id}`,{headers})
  }

}

