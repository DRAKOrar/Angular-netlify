import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion.model';
import { CrearTransaccionDTO} from '../models/transaccion.model';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private apiUrl = 'http://localhost:8081/transacciones';

  constructor(private http: HttpClient) {}

  realizarTransaccion(transaccionDTO: CrearTransaccionDTO): Observable<Transaccion> {
    return this.http.post<Transaccion>(`${this.apiUrl}/realizar`, transaccionDTO);
  }
  // Obtener transacciones por número de cuenta
  obtenerTransaccionesPorCuenta(numeroCuenta: string): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(`${this.apiUrl}/historial/${numeroCuenta}`);
  }

  editarTransaccion(id: number, transaccionDTO: CrearTransaccionDTO): Observable<Transaccion> {
    return this.http.put<Transaccion>(`${this.apiUrl}/editar/${id}`, transaccionDTO);
  }

  eliminarTransaccion(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/eliminar/${id}`);
  }
}
