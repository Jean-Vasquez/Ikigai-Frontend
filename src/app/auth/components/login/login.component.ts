import { Component, inject, Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/Auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(){}

  private fb = inject(FormBuilder);
  private authService = inject(AuthService)
  private router = inject(Router)

  public myForm: FormGroup = this.fb.group({
    usuario   : ['Jean592118', [Validators.required,Validators.minLength(8)]],
    contrasena: ['Jean592118',[Validators.required, Validators.minLength(6)]]
  });


  login(){
    
    const {usuario, contrasena} = this.myForm.value

    this.authService.login(usuario,contrasena)
    .subscribe({
      next: () =>{
        if(!localStorage.getItem('token')){
          this.router.navigateByUrl('/home')
        }
        const url = localStorage.getItem('token')
          this.router.navigateByUrl(`${url}`)
      } 
        
      ,
      error: (message) => {
        Swal.fire('Error', message , 'error')
      } 
    }
      
    
    )
    
    
  }
      

  }


  
  
  
  
  
  
  
  
  
  
  
  

