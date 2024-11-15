import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AuthService } from '../../services/Auth.service';
import { Router } from '@angular/router';
import { datosPersona } from '../../interfaces/datosPersona';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginFormulario : FormGroup;
  loginexitoso = false
 
  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router:Router
  ){

    this.loginFormulario = this.fb.group({

      usuario : ['', Validators.required],
      contrasena: ['',Validators.required]

    })

  }


  onLogin(){

    const{usuario,contrasena} = this.loginFormulario.value;



    this.authService.getCredenciales().subscribe(
      data=>{

        if(data.usuario === usuario && data.contrasena === contrasena){
          console.log("Iniciando Sesión..."),
          this.loginexitoso = true
          if(this.loginexitoso){
            this.router.navigate(['/index'])
          }
        }
        else{
          console.log("Datos incorrectos..")
        }
      })
    }
    
    Usuario:datosPersona={
      usuario:'',
      contrasena:''
    }    

      sendLogin(){
      const validacion = this.authService.login(this.Usuario.usuario!, this.Usuario.contrasena!)
      if (validacion === true) this.router.navigate(['/index'])  
      }

      

  }


  
  
  
  
  
  
  
  
  
  
  
  

