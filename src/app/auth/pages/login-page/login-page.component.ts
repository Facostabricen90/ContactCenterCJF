import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthResponse, LoginRequest } from '@/auth/models/auth.model';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);
  hasError = signal(false);
  isPosting = signal(false);

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage: string | null = null;

  onSubmit(): void {

    const rawForm = this.loginForm.getRawValue();
    if (rawForm.password.length < 6) {
      this.hasError.set(true)
      this.errorMessage = 'La contraseña debe ser mayor a 6 caracteres'
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      // this.hasError.set(true);
      return;
    }

    const loginRequest: LoginRequest = {
      username: rawForm.username,
      password: rawForm.password
    };

    this.auth.login(loginRequest).subscribe({
      next: (authResponse: AuthResponse) => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        if (error.status === 401) {
          this.hasError.set(true);
          this.errorMessage = 'Credenciales incorrectas';
        } else if (error.status === 0) {
          this.hasError.set(true);
          this.errorMessage = 'No se pudo conectar al servidor';
        } else {
          this.hasError.set(true);
          this.errorMessage = 'Error desconocido durante el login';
        }
      }
    });
  }
}
