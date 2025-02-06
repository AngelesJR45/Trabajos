import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-pedido',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.scss']
})
export class CrearPedidoComponent implements OnInit {
  pedido: any[] = [];
  usuarioID: string | null = '';
  pedidoConfirmado: any = null; // Almacenará la respuesta del pedido para mostrarla en el modal

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerUsuarioID();
    this.cargarPedido();
  }

  obtenerUsuarioID(): void {
    this.usuarioID = localStorage.getItem('UsuarioID');
    console.log('UsuarioID recuperado:', this.usuarioID);
  }

  cargarPedido(): void {
    const pedidoGuardado = localStorage.getItem('pedido');
    if (pedidoGuardado) {
      this.pedido = JSON.parse(pedidoGuardado);
      console.log('Pedido recuperado:', this.pedido);
      this.mostrarPedido();
    }
  }

  mostrarPedido(): void {
    console.log(`📌 UsuarioID: ${this.usuarioID}`);
    this.pedido.forEach((producto, index) => {
      console.log(`🛒 Producto ${index + 1}: ProductoID ${producto.id}`);
    });
  }

  eliminarProducto(index: number): void {
    this.pedido.splice(index, 1);
    localStorage.setItem('pedido', JSON.stringify(this.pedido));
    this.mostrarPedido();
  }

  vaciarPedido(): void {
    localStorage.removeItem('pedido');
    this.pedido = [];
    console.log('El pedido ha sido vaciado.');
  }

  irAProductos(): void {
    this.router.navigate(['/productos']);
  }

  confirmarPedido(): void {
    if (!this.usuarioID) {
      console.error('No se encontró UsuarioID.');
      return;
    }

    const token = localStorage.getItem('accessToken'); // Obtener token de autenticación
    if (!token) {
      console.error('No se encontró el token de autenticación.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Enviar cada producto del pedido a la API
    this.pedido.forEach((producto) => {
      const body = {
        UsuarioID: this.usuarioID,
        ProductoID: producto.id
      };

      this.http.post('http://localhost:1337/api/orders', body, { headers }).subscribe({
        next: (response) => {
          console.log('Pedido confirmado:', response);
          this.pedidoConfirmado = response; // Guardamos la respuesta para mostrarla en el modal
        },
        error: (err) => {
          console.error('Error al confirmar pedido:', err);
        }
      });
    });

    // Limpiar el pedido después de confirmarlo
    this.pedido = [];
    localStorage.removeItem('pedido');
  }
}
