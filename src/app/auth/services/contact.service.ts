import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Contact } from '../../models/contact.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${environment.apiUrl}/api/contacts`, { headers: this.getHeaders() });
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${environment.apiUrl}/api/contacts/${id}`, { headers: this.getHeaders() });
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${environment.apiUrl}/api/contacts`, contact, { headers: this.getHeaders() });
  }

  updateContact(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${environment.apiUrl}/api/contacts/${id}`, contact, { headers: this.getHeaders() });
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/contacts/${id}`, { headers: this.getHeaders() });
  }
}
