  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { ProductoService } from '../../services/producto.service';
  import { Producto } from '../../models/producto.model';
  import { CommonModule } from '@angular/common';
  import { Transaccion } from '../../models/transaccion.model';
  import { TransaccionService } from '../../services/transaccion.service';
  @Component({
    selector: 'app-listar-productos',
    imports: [ReactiveFormsModule, FormsModule, CommonModule],
    templateUrl: './listar-productos.component.html',
    styleUrl: './listar-productos.component.css'
  })
  export class ListarProductosComponent implements OnInit {
    productos: Producto[] = [];
    clienteIdControl = new FormControl('');
    errorMessage: string = '';
    loading: boolean = false;
    transacciones: Transaccion[] = []; // Lista de transacciones
    productoSeleccionado: Producto | null = null; // Producto seleccionado para ver detalles
    mostrarModal: boolean = false; // Controlar la visibilidad del modal

    // Propiedades para los modales de editar y eliminar
    mostrarModalEditar: boolean = false;
    mostrarModalEliminar: boolean = false;
    productoAEditar: Producto | null = null;
    productoAEliminar: number | null = null;
    nuevoEstado: string = 'ACTIVA'; // Estado por defecto

    constructor(private productoService: ProductoService, private transaccionService: TransaccionService) { }

    ngOnInit(): void { }

    buscarProductos(): void {
      if (this.clienteIdControl.value) {
        this.loading = true;
        this.errorMessage = '';

        this.productoService.obtenerProductosPorCliente(Number(this.clienteIdControl.value))
          .subscribe({
            next: (response) => {
              this.productos = response;
              this.loading = false;
              if (response.length === 0) {
                this.errorMessage = 'El cliente no tiene productos asociados';
              }
            },
            error: (error) => {
              this.errorMessage = error.error?.message || 'Error al obtener los productos';
              this.loading = false;
              this.productos = [];
            }
          });
      }
    }

    eliminarProducto(productoId?: number): void {
      if (!productoId) {
        console.error('El ID del producto es undefined');
        return;
      }

      if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        this.productoService.eliminarProducto(productoId).subscribe({
          next: () => {
            // Actualizar la lista de productos después de eliminar
            this.buscarProductos();
            alert('Producto eliminado correctamente');
          },
          error: (error) => {
            console.error('Error al eliminar el producto:', error);
            alert('No se puede eliminar el producto, porque tiene un saldo mayor a 0');
          }
        });
      }
    }
    editarProducto(producto: Producto): void {
      const nuevoEstado = prompt('Ingrese el nuevo estado del producto (ACTIVA, INACTIVA, CANCELADA):');

      if (nuevoEstado && ['ACTIVA', 'INACTIVA', 'CANCELADA'].includes(nuevoEstado.toUpperCase())) {
        this.productoService.actualizarEstadoProducto(producto.id!, nuevoEstado.toUpperCase()).subscribe({
          next: (productoActualizado) => {
            // Actualizar la lista de productos después de la edición
            this.buscarProductos();
            alert('Estado del producto actualizado correctamente');
          },
          error: (error) => {
            console.error('Error al actualizar el estado del producto:', error);
            alert('No se pudo actualizar el estado del producto');
          }
        });
      } else {
        alert('Estado no válido');
      }
    }

    getEstadoClass(estado: string): string {
      switch (estado.toUpperCase()) {
        case 'ACTIVA':
          return 'badge bg-success';
        case 'INACTIVA':
          return 'badge bg-warning';
        case 'CANCELADA':
          return 'badge bg-danger';
        default:
          return 'badge bg-secondary';
      }
    }

    // Método para ver las transacciones de un producto
    verDetalles(producto: Producto): void {
      this.productoSeleccionado = producto;
      this.transaccionService.obtenerTransaccionesPorCuenta(producto.numeroCuenta).subscribe({
        next: (transacciones) => {
          this.transacciones = transacciones;
          this.mostrarModal = true; // Mostrar el modal
        },
        error: (error) => {
          console.error('Error al obtener las transacciones:', error);
          alert('No se pudieron obtener las transacciones');
        }
      });
    }

    // Método para cerrar el modal
    cerrarModal(): void {
      this.mostrarModal = false;
      this.transacciones = []; // Limpiar la lista de transacciones
      this.productoSeleccionado = null; // Limpiar el producto seleccionado
    }

    // Método para abrir el modal de editar
    abrirModalEditar(producto: Producto): void {
      this.productoAEditar = producto;
      this.mostrarModalEditar = true;
    }

    // Método para cerrar el modal de editar
    cerrarModalEditar(): void {
      this.mostrarModalEditar = false;
      this.productoAEditar = null;
      this.nuevoEstado = 'ACTIVA'; // Reiniciar el estado
    }

    // Método para confirmar la edición
    confirmarEditar(): void {
      if (this.productoAEditar && this.nuevoEstado) {
        this.productoService.actualizarEstadoProducto(this.productoAEditar.id!, this.nuevoEstado).subscribe({
          next: (productoActualizado) => {
            this.buscarProductos(); // Actualizar la lista de productos
            this.cerrarModalEditar(); // Cerrar el modal
            alert('Estado del producto actualizado correctamente');
          },
          error: (error) => {
            console.error('Error al actualizar el estado del producto:', error);
            alert('No se pudo actualizar el estado del producto');
          }
        });
      }
    }

    // Método para abrir el modal de eliminar
    abrirModalEliminar(productoId: number): void {
      this.productoAEliminar = productoId;
      this.mostrarModalEliminar = true;
    }

    // Método para cerrar el modal de eliminar
    cerrarModalEliminar(): void {
      this.mostrarModalEliminar = false;
      this.productoAEliminar = null;
    }

    // Método para confirmar la eliminación
    confirmarEliminar(): void {
      if (this.productoAEliminar) {
        this.productoService.eliminarProducto(this.productoAEliminar).subscribe({
          next: () => {
            this.buscarProductos(); // Actualizar la lista de productos
            this.cerrarModalEliminar(); // Cerrar el modal
            alert('Producto eliminado correctamente');
          },
          error: (error) => {
            console.error('Error al eliminar el producto:', error);
            alert('No se puede eliminar el producto, porque tiene un saldo mayor a 0');
          }
        });
      }
    }
  }
