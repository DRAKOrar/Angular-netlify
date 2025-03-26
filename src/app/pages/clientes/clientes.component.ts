  import { Component } from '@angular/core';
  import { ClienteService } from '../../services/cliente.service';
  import { Cliente } from '../../models/cliente.model';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-clientes',
    imports:[CommonModule, FormsModule],
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
  })
  export class ClientesComponent {
    clientes: any[] = [];
    clienteSeleccionado: any = null;
    errorMessage: string | null = null; // Almacena el mensaje de error
    router: any;
  
    constructor(private clienteService: ClienteService) {}
  
    ngOnInit(): void {
      this.cargarClientes();
    }
  
    cargarClientes(): void {
      this.clienteService.listarClientes().subscribe(data => {
        this.clientes = data;
      });
    }
  
    editarCliente(cliente: any): void {
      this.clienteSeleccionado = { ...cliente };
    }
  
    actualizarCliente(): void {
      if (!this.clienteSeleccionado) return;
  
      this.clienteService.actualizarCliente(this.clienteSeleccionado.id, this.clienteSeleccionado)
        .subscribe(() => {
          this.cargarClientes();
          this.clienteSeleccionado = null;
        }, error => {
          console.error('Error al actualizar el cliente', error);
        });
    }
  
    cancelarEdicion(): void {
      this.clienteSeleccionado = null;
    }
  
    eliminarCliente(id: number): void {
      this.errorMessage = null; // Limpiar mensaje anterior
  
      this.clienteService.eliminarCliente(id)
        .subscribe(() => {
          this.cargarClientes();
        }, error => {
          console.error('Error al eliminar el cliente', error);
          
          // Si el backend responde con un error específico
          if (error.status === 400 || error.status === 409) {
            this.errorMessage = 'No se puede eliminar el cliente porque tiene cuentas asociadas.';
          } else {
            this.errorMessage = 'Ocurrió un error al eliminar el cliente.';
          }
        });
    }

    irAgregarCliente(): void {
      this.router.navigate(['/agregar-cliente']);
    }
  }
  