import { Component } from '@angular/core';
import { UserService } from '../../services/User.service';
import { configUser } from '../../interfaces/usuario';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent {
  public id : string = ''
  public dataUsuario : configUser[] = []
  constructor(private userService: UserService){
    this.traerDatos()
    console.log(this.dataUsuario)
  }

  traerDatos(){
    this.userService.datosUsuario().subscribe({
      next: (value) => {
        this.id = value._id;
        
        if(this.id !== ''){
          this.userService.buscardDatos(this.id).subscribe({
            next: (value) => {
              this.dataUsuario.push(value);
            }
          })
        }}
      })
  }
}
