import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarBookingDto, CarDto } from '../../../types';
import { StorageService } from '../../../auth/services/storage/storage.service';

const API_URL = ['http://localhost:8080']

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCars(): Observable<CarDto[]> {
    return this.http.get<CarDto[]>(`${API_URL}/api/customer/cars`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarById(id: number): Observable<CarDto> {
    return this.http.get<CarDto>(`${API_URL}/api/customer/car/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  postCarBooking(carId: any, carBookingDto: CarBookingDto): Observable<any> {
    return this.http.post<[]>(`${API_URL}/api/customer/car/book/${carId}`, carBookingDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getBookingsByUserId(): Observable<any> {
    return this.http.get(`${API_URL}/api/customer/car/bookings/${StorageService.getUserId()}`, {
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
