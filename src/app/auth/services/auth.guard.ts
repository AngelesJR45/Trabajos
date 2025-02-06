import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('accessToken'); // Obtener token almacenado

    if (!token) {
      this.router.navigate(['/login']); // Si no hay token, redirigir a login
      return false;
    }
    return true; // Si hay token, permitir acceso
  }
}
