import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agregar-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent {
  nuevoCliente: Cliente = {
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    nombres: '',
    apellido: '',
    correoElectronico: '',
    fechaNacimiento: ''
  };

  successMessage: string = ''; // Mensaje de éxito
  errorMessage: string = '';   // Mensaje de error

  constructor(private clienteService: ClienteService) {}

  agregarCliente() {
    // Limpiar mensajes anteriores
    this.successMessage = '';
    this.errorMessage = '';

    // Validar campos obligatorios
    if (!this.nuevoCliente.tipoIdentificacion || !this.nuevoCliente.numeroIdentificacion || 
        !this.nuevoCliente.nombres || !this.nuevoCliente.apellido || 
        !this.nuevoCliente.correoElectronico || !this.nuevoCliente.fechaNacimiento) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    // Validar formato de correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.nuevoCliente.correoElectronico)) {
      this.errorMessage = 'El correo electrónico no tiene un formato válido.';
      return;
    }

    // Llamar al servicio para crear el cliente
    this.clienteService.crearCliente(this.nuevoCliente).subscribe({
      next: () => {
        // Éxito: Mostrar mensaje y limpiar el formulario
        this.successMessage = 'Cliente agregado exitosamente.';
        this.nuevoCliente = {
          tipoIdentificacion: '',
          numeroIdentificacion: '',
          nombres: '',
          apellido: '',
          correoElectronico: '',
          fechaNacimiento: ''
        };
      },
      error: (err) => {
        // Error: Mostrar mensaje de error
        this.errorMessage = 'Ocurrió un error al agregar el cliente. Por favor, inténtelo de nuevo.';
        console.error('Error al agregar cliente:', err);
      }
    });
  }
}