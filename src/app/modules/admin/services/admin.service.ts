import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarDto } from '../../../types';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const API_URL = ['http://localhost:8080']

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  postCar(carDto: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/api/admin/car`, carDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllCars(): Observable<CarDto[]> {
    return this.http.get<CarDto[]>(`${API_URL}/api/admin/cars`, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/api/admin/car/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarById(id: number): Observable<CarDto> {
    return this.http.get<CarDto>(`${API_URL}/api/admin/car/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader() {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization', 
      'Bearer ' + StorageService.getToken()
    );
  }
}
