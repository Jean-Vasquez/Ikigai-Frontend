import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/Auth.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent{

  private authService = inject(AuthService)
  
  public user = computed(() =>this.authService.usuario());

}
