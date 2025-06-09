import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '@/auth/services/contact.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Contact, ContactRequest } from '../../../models/contact.model';

@Component({
  selector: 'app-object-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './object-page.component.html',
})
export class ObjectPageComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private router = inject(Router);
  hasError = signal(false);
  isPosting = signal(false);

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  contactForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });

  onSubmit() {

    this.contactForm.markAllAsTouched();

    if (this.contactForm.invalid) {
      this.hasError.set(true);
      this.errorMessage.set('Por favor completa el formulario correctamente');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const rawForm = this.contactForm.getRawValue();

    const ContactRequest: ContactRequest = {
          name: rawForm.name,
          lastName: rawForm.lastName,
          email: rawForm.email,
          phone: rawForm.phone
        };

    this.contactService.createContact(ContactRequest).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => this.handleError(error),
      complete: () => this.isLoading.set(false)
    });
  }

  private handleError(error: any): void {
    this.isLoading.set(false);

    if (error.status === 401) {
      this.errorMessage.set('Sesión expirada. Por favor inicia sesión nuevamente.');
    } else if (error.status === 400) {
      this.errorMessage.set(error.error?.message || 'Datos inválidos');
    } else {
      this.errorMessage.set('Error al crear contacto. Intenta nuevamente.');
    }
  }
}
