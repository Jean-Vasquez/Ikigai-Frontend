import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent{
constructor(private authService:AuthService){}
  logout(){
    this.authService.logout()
  }
  
}
