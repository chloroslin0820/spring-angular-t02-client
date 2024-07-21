import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, SignupRequest } from '../../../types';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

// const API_URL = ['http://localhost:8080'];

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/auth/signup`, signupRequest);
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/auth/login`, loginRequest);
  }

  checkEmailExists(email: string): Observable<boolean> {
    const url = `${environment.API_URL}/api/auth/email-exists?email=${encodeURIComponent(email)}`;
    return this.http.get<boolean>(url);
  }
}
