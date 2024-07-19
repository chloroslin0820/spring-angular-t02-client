import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CarDto } from '../../../../types';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  cars: CarDto[] = [];

  constructor(
    private adminService: AdminService,
    private message: NzMessageService,
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

  deleteCar(id: number | undefined) {
    if (!id) return;
    this.adminService.deleteCar(id).subscribe(() => {
      this.cars = this.cars.filter((car: CarDto) => car.id !== id);
      this.message.success('Car deleted successfully', { nzDuration: 3000 });
    });
  }
}
