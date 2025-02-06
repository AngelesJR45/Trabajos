import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { ProductosComponent } from './auth/components/productos/productos.component';
import { CrearPedidoComponent } from './auth/components/crear-pedido/crear-pedido.component';
import { ConsultarPedidosComponent } from './auth/components/consultar-pedido/consultar-pedidos.component';
import { AuthGuard } from './auth/services/auth.guard';




export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
    { path: 'crear-pedido', component: CrearPedidoComponent, canActivate: [AuthGuard] },
    { path: 'consultarpedido', component: ConsultarPedidosComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login' }
];
