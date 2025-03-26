import { Producto } from "./producto.model";
export interface Cliente {
    id?: number;
    tipoIdentificacion: string;
    numeroIdentificacion: string;
    nombres: string;
    apellido: string;
    correoElectronico: string;
    fechaNacimiento: string;
    fechaCreacion?: string;
    fechaModificacion?: string;
    productos?: Producto[];
  }
  