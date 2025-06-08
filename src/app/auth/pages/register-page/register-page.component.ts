import { AuthResponse, RegisterRequest } from '@/auth/models/auth.model';
import { AuthService } from '@/auth/services/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  auth = inject(AuthService);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    country: ['', Validators.required],
  });

  errorMessage: string | null = null;

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawForm = this.form.getRawValue();

    const registerRequest: RegisterRequest = {
      username: rawForm.username,
      password: rawForm.password,
      firstName: rawForm.firstName,
      lastName: rawForm.lastName,
      email: rawForm.email,
      country: rawForm.country
    };

    this.auth.register(registerRequest).subscribe({
      next: (authResponse: AuthResponse) => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else if (error.status === 400) {
          this.errorMessage = 'Datos inválidos';
        } else if (error.status === 409) {
          this.errorMessage = 'El usuario o email ya existe';
        } else {
          this.errorMessage = 'Error durante el registro';
        }
      }
    });
  }

}
