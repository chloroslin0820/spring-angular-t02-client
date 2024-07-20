import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CarDto } from '../../../../types';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {
  cars: CarDto[] = [];

  constructor(
    private customerService: CustomerService,
  ) {}

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.customerService.getAllCars().subscribe((res: CarDto[]) => {
      res.forEach((car: CarDto) => {
        car.processedImage = 'data:image/jpeg;base64,' + car.returnImage;
        this.cars.push(car);
      });
    });
  }
}
