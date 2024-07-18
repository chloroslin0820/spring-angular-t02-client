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
