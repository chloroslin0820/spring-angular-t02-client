import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarBookingDto, CarDto } from '../../../types';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { environment } from '../../../../environments/environment';

// const API_URL = ['http://chloroslin-spring-angular-t02-se-env.eba-mwidv9bj.ap-southeast-1.elasticbeanstalk.com']
const API_URL = environment.API_URL;

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

  updateCar(id: number, formData: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/api/admin/car/${id}`, formData, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarBookings(): Observable<CarBookingDto[]> {
    return this.http.get<CarBookingDto[]>(`${API_URL}/api/admin/car/bookings`, {
      headers: this.createAuthorizationHeader()
    });
  }

  searchCar(searchCarDto: CarDto): Observable<CarDto> {
    return this.http.post<CarDto>(`${API_URL}/api/admin/car/search`, searchCarDto, {
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
