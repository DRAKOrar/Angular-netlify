import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CrearProductoDTO } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-agregar-producto',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent implements OnInit {
    productoForm: FormGroup;
    tiposCuenta = ['AHORRO', 'CORRIENTE'];
    errorMessage: string = '';
    successMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private productoService: ProductoService
    ) {
        this.productoForm = this.fb.group({
            clienteId: ['', [Validators.required]],
            tipoCuenta: ['', [Validators.required]],
            numeroCuenta: ['', [Validators.required]], // Se llenará automáticamente
            saldo: [0, [Validators.required, Validators.min(0)]],
            exentaGMF: [false]
        });
    }

    ngOnInit(): void {}

    generarNumeroCuenta(): void {
        const tipoCuenta = this.productoForm.get('tipoCuenta')?.value;
        if (tipoCuenta === 'AHORRO') {
            this.productoForm.patchValue({ 
                numeroCuenta: '53' + Math.floor(100000000 + Math.random() * 900000000)
            });
        } else if (tipoCuenta === 'CORRIENTE') {
            this.productoForm.patchValue({ 
                numeroCuenta: '33' + Math.floor(100000000 + Math.random() * 900000000)
            });
        }
    }

    onSubmit(): void {
        if (this.productoForm.valid) {
            const clienteId = this.productoForm.get('clienteId')?.value;
            const productoDTO: CrearProductoDTO = {
                tipoCuenta: this.productoForm.get('tipoCuenta')?.value,
                numeroCuenta: this.productoForm.get('numeroCuenta')?.value,
                estado: 'ACTIVA',  // Siempre activa para cuentas de ahorro
                saldo: this.productoForm.get('saldo')?.value,
                exentaGMF: this.productoForm.get('exentaGMF')?.value
            };

            this.productoService.agregarProducto(clienteId, productoDTO)
                .subscribe({
                    next: (response) => {
                        this.successMessage = 'Producto creado exitosamente';
                        this.errorMessage = '';
                        this.productoForm.reset();
                    },
                    error: (error) => {
                        this.errorMessage = error.error?.message || 'Error al crear el producto';
                        this.successMessage = '';
                    }
                });
        } else {
            this.errorMessage = 'Por favor, complete todos los campos requeridos correctamente';
        }
    }
}
