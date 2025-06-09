export interface Contact {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  nameUser?: string;
}

export interface ContactRequest {
  name: string;
  lastName: string;
  email: string;
  phone: string;
}
