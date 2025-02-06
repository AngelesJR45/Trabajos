import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loginExitoso: boolean | null = null;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.autenticado) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);

            this.authService.verificarUsuario(this.loginForm.value).subscribe({
              next: (userResponse) => {
                if (userResponse.existe) {
                  const usuarioID = userResponse.usuario.UsuarioID;
                  localStorage.setItem('UsuarioID', usuarioID.toString()); // Guardamos el UsuarioID
                  console.log('UsuarioID almacenado:', usuarioID);

                  this.router.navigate(['/productos']); // Redirigir a productos
                } else {
                  this.errorMessage = 'Usuario no encontrado.';
                }
              },
              error: () => {
                this.errorMessage = 'Error al verificar usuario.';
              }
            });
            
            
            
  
            this.successMessage = response.mensaje;
            this.errorMessage = '';
  
            // Redirigir a productos
            setTimeout(() => {
              this.router.navigate(['/productos']);
            }, 1500);
          } else {
            this.errorMessage = 'Autenticación fallida.';
            this.successMessage = '';
          }
        },
        error: () => {
          this.errorMessage = 'Error en el inicio de sesión. Intente nuevamente.';
          this.successMessage = '';
        }
      });
    }
  }
}
