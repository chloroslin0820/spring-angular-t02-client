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
  processedImage?: string;
}

export interface CarBookingDto {
  id?: number;
  carId?: number;
  userId?: number;
  fromDate: Date;
  toDate: Date;
  bookCarStatus?: BookingStatus;
  userName?: string;
  email?: string;
  days?: number;
  price?: number;
}

type BookingStatus = 'APPROVED' | 'PENDING' | 'REJECTED';

