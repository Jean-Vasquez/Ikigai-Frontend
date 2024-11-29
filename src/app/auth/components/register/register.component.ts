import { Component } from '@angular/core';
import { datosPersona } from '../../interfaces/data/datos-persona.interface';
import { AuthService } from '../../services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Inyección del servicio
  constructor(
    private readonly authSevice: AuthService,
    private readonly router: Router
  ) {}

  // Crear un objeto vacío para almacenar el usuario que se va a registrar
  persona: datosPersona = {
    nombres: '',
    apellidos: '',
    tipodoc: '',
    numerodoct: '',
    fechanaci: new Date(),
    direccion: '',
    correo: '',
    telefono: '',
  };
  today: string = new Date().toISOString().split('T')[0]; // Obtener la fecha de hoy en formato YYYY-MM-DD

  // Función para enviar el usuario al servicio con validaciones
  enviarUser(): void {
    // Validación de nombres
    if (this.persona.nombres.length === 0) {
      this.showCustomAlert('El nombre no debe estar vacío.', 'error', 'nombres');
      return;
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(this.persona.nombres)) {
      this.showCustomAlert('El nombre no debe contener números ni caracteres especiales.', 'error', 'nombres');
      return;
    }

    // Validación de apellidos
    if (this.persona.apellidos.length === 0) {
      this.showCustomAlert('El apellido no debe estar vacío.', 'error', 'apellidos');
      return;
    }
    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(this.persona.apellidos)) {
      this.showCustomAlert('El apellido no debe contener números ni caracteres especiales.', 'error', 'apellidos');
      return;
    }

    // Validación de tipo de documento
    // Validación de tipo de documento
if (this.persona.tipodoc === '') {
  this.showCustomAlert('Por favor, selecciona el tipo de documento.', 'error', 'tipodoc');
  return;
}

// Validación de número de documento según el tipo
const numeroDoc = this.persona.numerodoct.trim();

// Verificar si el número de documento está vacío
if (numeroDoc.length === 0) {
  this.showCustomAlert('El número de documento no debe estar vacío.', 'error', 'numerodoct');
  return;
}

// Validaciones según el tipo de documento
if (this.persona.tipodoc === 'DNI') {
  // Validar que el número de DNI contenga solo 8 dígitos
  if (!/^\d{8}$/.test(numeroDoc)) {
    this.showCustomAlert('El DNI debe contener exactamente 8 dígitos.', 'error', 'numerodoct');
    return;
  }
} else if (this.persona.tipodoc === 'PASAPORTE') {
  // Validar que el número de pasaporte sea alfanumérico (5-9 caracteres)
  if (!/^[A-Za-z0-9]{5,9}$/.test(numeroDoc)) {
    this.showCustomAlert('El número de pasaporte debe ser alfanumérico y tener entre 5 y 9 caracteres.', 'error', 'numerodoct');
    return;
  }
} else if (this.persona.tipodoc === 'CARNET_EXTRANJERIA') {
  // Validar que el número de carnet de extranjería sea alfanumérico (ejemplo de validación)
  if (!/^[A-Za-z0-9]{7,12}$/.test(numeroDoc)) {
    this.showCustomAlert('El número de Carnet de Extranjería debe ser alfanumérico y tener entre 7 y 12 caracteres.', 'error', 'numerodoct');
    return;
  }
} else {
  // Si no se seleccionó un tipo de documento válido
  this.showCustomAlert('Tipo de documento no válido.', 'error', 'tipodoc');
  return;
}

   

    // Validación de fecha de nacimiento
  const fechaNacimiento = new Date(this.persona.fechanaci);

    // Verifica que la fecha de nacimiento no sea futura
    if (fechaNacimiento > new Date()) {
    this.showCustomAlert('La fecha de nacimiento no puede ser futura.', 'error', 'fechanaci');
    return;
    }

    // Calcular la edad
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    const dia = hoy.getDate() - fechaNacimiento.getDate();

    // Ajuste de edad si el cumpleaños no ha ocurrido este año
    if (mes < 0 || (mes === 0 && dia < 0)) {
      edad--;
    }

    // Validar que la persona tenga al menos 18 años
    if (edad < 18) {
      this.showCustomAlert('Debes tener al menos 18 años.', 'error', 'fechanaci');
      return;
    }


    // Validación de dirección
    if (this.persona.direccion === "") {
      this.showCustomAlert('La dirección no debe estar vacía.', 'error', 'direccion');
      return;
    }

    // Validación de correo
    if (this.persona.correo.length === 0) {
      this.showCustomAlert('El correo no debe estar vacío.', 'error', 'correo');
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.persona.correo)) {
      this.showCustomAlert('El correo electrónico no es válido.', 'error', 'correo');
      return;
    }

    // Validación de teléfono
    if (this.persona.telefono.length === 0) {
      this.showCustomAlert('El teléfono no debe estar vacío.', 'error', 'telefono');
      return;
    }
    if (!/^\d+$/.test(this.persona.telefono)) {
      this.showCustomAlert('El teléfono solo debe contener números.', 'error', 'telefono');
      return;
    }

    // Si todas las validaciones pasan, se envía la persona al servicio
    this.authSevice.datosPersona(this.persona);
    this.router.navigate(['/auth/create-user']);
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
      // Ubicar el mensaje cerca del campo específico
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

    // Si no hay un campo específico, se muestra centrado (opcional)
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
