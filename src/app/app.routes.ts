import { Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { AgregarClienteComponent } from './pages/agregar-cliente/agregar-cliente.component';
import { AgregarProductoComponent } from './pages/agregar-producto/agregar-producto.component';
import { ListarProductosComponent } from './pages/listar-productos/listar-productos.component';
import { RealizarTransaccionComponent } from './pages/realizar-transaccion/realizar-transaccion.component';

export const routes: Routes = [
    { path: '', redirectTo: 'cliente', pathMatch: 'full' }, // Redirección raíz
    { path: 'cliente', component: ClientesComponent },
    { path: 'agregar-cliente', component: AgregarClienteComponent },
    { path: 'agregar-productos', component: AgregarProductoComponent},
    { path: 'listar-productos', component: ListarProductosComponent},
    { path: 'realizar-transaccion', component: RealizarTransaccionComponent},
    { path: '**', component: ClientesComponent } // Ruta comodín para 404
  ];