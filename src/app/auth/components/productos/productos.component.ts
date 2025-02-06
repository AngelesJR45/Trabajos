import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: any[] = [];
  pedido: any[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.cargarPedido();
  }

  obtenerProductos(): void {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any[]>('http://localhost:1337/api/products', { headers }).subscribe({
      next: (data) => {
        this.productos = data.map(p => ({
          id: p.ProductoID,
          nombre: p.NombreP,
          precio: p.Precio,
          stock: p.Stock,
          descripcion: p.Descripcion,  // Asegurar que se guarda toda la información del producto
          imagen: p.Imagen             // Si hay una imagen, guardarla también
        }));
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        this.router.navigate(['/login']);
      }
    });
  }

  agregarAlPedido(producto: any): void {
    this.pedido = JSON.parse(localStorage.getItem('pedido') || '[]'); // Cargar pedido existente
    this.pedido.push(producto); // Agregar el nuevo producto
    localStorage.setItem('pedido', JSON.stringify(this.pedido)); // Guardar en localStorage
    console.log('Pedido actualizado:', this.pedido);
  }

  cargarPedido(): void {
    const pedidoGuardado = localStorage.getItem('pedido');
    if (pedidoGuardado) {
      this.pedido = JSON.parse(pedidoGuardado);
    }
  }

  cerrarSesion(): void {
    this.authService.logout();
    localStorage.removeItem('pedido');
    this.router.navigate(['/login']);
  }

  irACrearPedido(): void {
    this.router.navigate(['/crear-pedido']); // Navegar a la página "Crear Pedido"
  }
  irAConsultarDetalle(): void {
    this.router.navigate(['/consultarpedido']); // Navegar a la página "Crear Pedido"
  }
}
