import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:1337/auth/login'; // Endpoint de autenticación
  private verificarUrl = 'http://localhost:1337/usuario/verificar'; // Endpoint para verificar usuario

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(credentials: { email: string; contrasenia: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  // Método para verificar usuario y obtener UsuarioID
  verificarUsuario(credentials: { email: string; contrasenia: string }): Observable<any> {
    return this.http.post<any>(this.verificarUrl, credentials);
  }

  // Método para almacenar tokens en localStorage
  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  // Método para obtener el token de acceso
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Método para cerrar sesión (borrar tokens y datos de usuario)
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('UsuarioID'); // También eliminamos el UsuarioID
  }
}
