import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/Auth.service';
import { AuthModule } from './auth/auth.module';
import { Router } from '@angular/router';
import { estadoLogin } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  public authService = inject(AuthService)

  
}
