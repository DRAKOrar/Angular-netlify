import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransaccionService } from '../../services/transaccion.service';
import { CrearTransaccionDTO } from '../../models/transaccion.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-realizar-transaccion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './realizar-transaccion.component.html',
  styleUrl: './realizar-transaccion.component.css'
})
export class RealizarTransaccionComponent {

  transaccionForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private transaccionService: TransaccionService
  ) {
    this.transaccionForm = this.fb.group({
      numeroCuenta: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      tipoTransaccion: ['', [Validators.required]],
      monto: ['', [Validators.required, Validators.min(1)]],
      numeroCuentaDestino: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onSubmit(): void {
    if (this.transaccionForm.valid) {
      const transaccionDTO: CrearTransaccionDTO = this.transaccionForm.value;

      this.transaccionService.realizarTransaccion(transaccionDTO).subscribe({
        next: (response) => {
          this.successMessage = `Transacción realizada con éxito. Nuevo saldo: ${response.monto}`;
          this.transaccionForm.reset();
          this.errorMessage = '';
          console.log('Datos enviados:', this.transaccionForm.value);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al realizar la transacción';
          this.successMessage = '';
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }
}
