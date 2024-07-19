import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CarDto } from '../../../../types';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  cars: CarDto[] = [];

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe((res: CarDto[]) => {
      res.forEach((car: CarDto) => {
        car.processedImage = 'data:image/jpeg;base64,' + car.returnImage;
        this.cars.push(car);
      });
    });
  }
}
