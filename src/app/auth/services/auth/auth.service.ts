import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, SignupRequest } from '../../../types';
import { Observable } from 'rxjs';
// import { environment } from '../../../../environments/environment';

const API_URL = ['http://chloroslin-spring-angular-t02-se-env.eba-mwidv9bj.ap-southeast-1.elasticbeanstalk.com'];

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(`${API_URL}/api/auth/signup`, signupRequest);
  }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(`${API_URL}/api/auth/login`, loginRequest);
  }

  checkEmailExists(email: string): Observable<boolean> {
    const url = `${API_URL}/api/auth/email-exists?email=${encodeURIComponent(email)}`;
    return this.http.get<boolean>(url);
  }
}
