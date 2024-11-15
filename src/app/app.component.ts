import { Component } from '@angular/core';
import { AuthService } from './auth/services/Auth.service';
import { AuthModule } from './auth/auth.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'IKIGAI-PROYECTO-FINAL';
  constructor(public authService:AuthService){}
}
