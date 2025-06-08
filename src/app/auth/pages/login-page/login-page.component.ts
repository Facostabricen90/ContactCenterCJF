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
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage: string | null = null;

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const rawForm = this.loginForm.getRawValue();
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
          this.errorMessage = 'Credenciales incorrectas';
        } else if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar al servidor';
        } else {
          this.errorMessage = 'Error desconocido durante el login';
        }
      }
    });
  }
}
