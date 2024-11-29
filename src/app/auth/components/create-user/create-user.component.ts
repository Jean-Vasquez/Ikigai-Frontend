import { Component } from '@angular/core';
import { AuthService } from '../../services/Auth.service';
import { datosUsuario } from '../../interfaces/data/datos-usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class  CreateUserComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  usuario: datosUsuario = {
    usuario: '',
    contrasena: '',
    rol: 'cliente',
    idpersona: {
      nombres: '',
      apellidos: '',
      tipodoc: '',
      numerodoct: '',
      fechanaci: new Date(),
      direccion: '',
      correo: '',
      telefono: ''
    }
  }
  //creacion de variable para validar si esta cargando
  isLoading: boolean = false;

  // Función para crear el usuario con validaciones
  async createUser() {
    this.isLoading=true

    // Validaciones previas
    if (this.usuario.usuario=== '') {
      this.showCustomAlert('El nombre de usuario es obligatorio.', 'error', 'usuario');
      this.isLoading = false
      return;
    }if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(this.usuario.usuario)) {
      this.showCustomAlert('El nombre no debe contener números ni caracteres especiales.', 'error', 'nombres');
      this.isLoading = false
      return;
    }
    //validacion segun backend
    if(this.usuario.usuario.length<8){
      this.showCustomAlert('El nombre de usuario debe tener al menos 8 caracteres.', 'error', 'usuario');
      this.isLoading = false
      return;
    } 

    //validacion de la contraseña
    if (this.usuario.contrasena === '') {
      this.showCustomAlert('La contraseña es obligatoria.', 'error', 'contrasena');
      this.isLoading = false
      return;
    }

    //validacion de la contraseña segun backend
    if (this.usuario.contrasena.length < 6) {
      this.showCustomAlert('La contraseña debe tener al menos 6 caracteres.', 'error', 'contrasena');
      this.isLoading = false
      return;
    }


      // Enviar los datos al servicio si las validaciones son correctas
      try {
        const user = await this.authService.registrar(this.usuario);
  
        // Verificar si la creación fue exitosa (comprobando que _id esté presente)
        if (user && user._id) {
          this.showCustomAlert('Usuario creado con éxito.', 'success');
          this.isLoading = false
          this.router.navigate(['/auth/login']);
        } else {
          // Si no se recibe un ID, significa que hubo un error
          this.showCustomAlert('Hubo un error al crear el usuario.', 'error');
          this.isLoading = false
        }
      } catch (error) {
        this.showCustomAlert('Hubo un problema al crear el usuario.', 'error');
        this.isLoading = false
      }  
  }


  // Función para mostrar el mensaje de alerta personalizado
  showCustomAlert(message: string, type: 'success' | 'error', fieldId?: string) {
    const alertDiv = document.createElement('div');
    alertDiv.style.position = 'absolute';
    alertDiv.style.padding = '5px 10px';
    alertDiv.style.zIndex = '1055';
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.color = '#fff';
    alertDiv.style.fontSize = '14px';
    alertDiv.style.textAlign = 'left';
    alertDiv.style.minWidth = '200px';
    alertDiv.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.2)';
    alertDiv.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
    alertDiv.textContent = message;

    if (fieldId) {
      const targetField = document.getElementById(fieldId);
      if (targetField) {
        const fieldRect = targetField.getBoundingClientRect();
        alertDiv.style.position = 'absolute';
        alertDiv.style.top = `${fieldRect.bottom + window.scrollY + 5}px`;
        alertDiv.style.left = `${fieldRect.left + window.scrollX}px`;
        document.body.appendChild(alertDiv);
        setTimeout(() => {
          alertDiv.remove();
        }, 2000);
        return;
      }
    }

    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '50%';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      alertDiv.remove();
    }, 2000);
  }
}
