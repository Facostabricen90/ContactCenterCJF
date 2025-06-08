export interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  role?: Role;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}
