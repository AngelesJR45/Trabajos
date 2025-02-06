import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultar-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-pedidos.component.html',
  styleUrls: ['./consultar-pedidos.component.css']
})
export class ConsultarPedidosComponent implements OnInit {
  filtro: string = ''; // Variable para el filtro de búsqueda
  pedidoDetalle: any = null; // Almacena los detalles del pedido consultado
  token: string | null = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.validarToken();
  }

  validarToken(): void {
    this.token = localStorage.getItem('accessToken');
    if (!this.token) {
      console.error('No se encontró token, redirigiendo al login...');
      this.router.navigate(['/login']);
    }
  }

  buscarPedido(): void {
    if (!this.filtro) {
      alert('Ingrese un ID de pedido válido.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    this.http.get<any>(`http://localhost:1337/api/orders/${this.filtro}`, { headers }).subscribe({
      next: (response) => {
        console.log('Pedido encontrado:', response);
        this.pedidoDetalle = response; // Guardamos la información del pedido
      },
      error: (err) => {
        console.error('Error al buscar pedido:', err);
        alert('No se encontró el pedido. Verifique el ID.');
      }
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('UsuarioID');
    this.router.navigate(['/login']);
  }

  regresarTienda(): void {
    this.router.navigate(['/productos']);
  }
}
