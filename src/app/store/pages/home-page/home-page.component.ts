import { Component, inject, OnInit, signal } from '@angular/core';
import { ContactService } from '@/auth/services/contact.service';
import { AuthService } from '@/auth/services/auth.service';
import { Contact } from '@/models/contact.model';
import { LoginRequest } from '@/auth/models/auth.model';
import { ProductCardComponent } from '@/manage/components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, RouterLink],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private contactService = inject(ContactService);
  private authService = inject(AuthService);
  private router = inject(Router);

  contacts = signal<Contact[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.isLoading.set(true);
    this.error.set(null);

    this.contactService.getAllContacts().subscribe({
      next: (contacts) => {
        this.contacts.set(contacts);
        this.isLoading.set(false);
      },
      error: (err) => {
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        } else {
          this.error.set('Error al cargar contactos');
        }
        this.isLoading.set(false);
      }
    });
  }

  onDelete(id: number) {
    if (confirm('¿Estás seguro de eliminar este contacto?')) {
      this.contactService.deleteContact(id).subscribe({
        next: () => {
          this.contacts.set(this.contacts().filter(c => c.id !== id));
        },
        error: (err) => {
          this.error.set('Error al eliminar contacto');
        }
      });
    }
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
 }
