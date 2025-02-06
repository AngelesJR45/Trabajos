import { Component } from '@angular/core';
import {RouterModule ,RouterOutlet } from '@angular/router';

import { LoginComponent } from "./auth/components/login/login.component";
import { ProductosComponent } from './auth/components/productos/productos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, ProductosComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TiendaVirtualAbarrotes';
}
