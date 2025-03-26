export interface CrearTransaccionDTO {
  tipoTransaccion: 'deposito' | 'retiro';
  monto: number;
  numeroCuenta: string; 
}

export interface Transaccion {
  id: number;
  tipoTransaccion: string;
  monto: number;
  fechaTransaccion: string;
  numeroCuenta: string;  
}
