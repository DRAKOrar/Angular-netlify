export interface Producto {
  id?: number;
  tipoCuenta: string;
  numeroCuenta: string;
  estado: string;
  saldo: number;
  exentaGMF: boolean;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
  clienteId?: number;
}

export interface CrearProductoDTO {
  tipoCuenta: string;
  numeroCuenta: string;
  estado: string;
  saldo: number;
  exentaGMF: boolean;
}