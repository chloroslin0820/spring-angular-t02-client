import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupRequest } from '../../../types';
import { Observable } from 'rxjs';

const API_URL = ['http://localhost:8080'];

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(`${API_URL}/api/auth/signup`, signupRequest);
  }

  checkEmailExists(email: string): Observable<boolean> {
    const url = `${API_URL}/api/auth/email-exists?email=${encodeURIComponent(email)}`;
    return this.http.get<boolean>(url);
  }
}
