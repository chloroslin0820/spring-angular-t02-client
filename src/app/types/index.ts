export interface SignupRequest {
  email: string;
  name: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  jwt: string;
  userId: number;
  userRole: string;
}

export interface CarDto {
  id?: number;
  brand: string;
  color: string;
  name: string;
  type: string;
  transmission: string;
  description: string;
  price: number;
  year: Date;
  image?: File;
  returnImage?: Uint8Array;
}

