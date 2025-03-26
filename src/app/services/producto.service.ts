import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto,CrearProductoDTO } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8081/productos'; // Asegúrate que este puerto coincida con tu backend

  constructor(private http: HttpClient) { }

  // Obtener todos los productos de un cliente
  obtenerProductosPorCliente(clienteId: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/listar/${clienteId}`);
  }

  // Agregar un nuevo producto a un cliente
  agregarProducto(clienteId: number, producto: CrearProductoDTO): Observable<Producto> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<Producto>(
      `${this.apiUrl}/agregar/${clienteId}`, 
      producto,
      { headers }
    );
  }

  // Eliminar un producto
  eliminarProducto(productoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${productoId}`);
  }

  actualizarEstadoProducto(productoId: number, nuevoEstado: string): Observable<Producto> {
    const params = new HttpParams().set('nuevoEstado', nuevoEstado); // Enviar como query parameter
    return this.http.patch<Producto>(`${this.apiUrl}/${productoId}/estado`, null, { params });
}

  // Obtener un producto por su ID
  obtenerProductoPorId(productoId: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${productoId}`);
  }

  // Obtener productos por tipo de cuenta
  obtenerProductosPorTipo(tipoCuenta: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/tipo/${tipoCuenta}`);
  }

  // Obtener productos por estado
  obtenerProductosPorEstado(estado: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/estado/${estado}`);
  }
}
