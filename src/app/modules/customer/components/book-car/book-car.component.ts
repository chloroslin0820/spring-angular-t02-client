import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from '../../../../types';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {
  id: number = this.activatedRoute.snapshot.params['id'];
  car: CarDto | null = null;
  processedImage: string | null = null;

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getCarById();
  }

  getCarById() {
    this.customerService.getCarById(this.id).subscribe((res) => {
      console.log(res);
      this.processedImage = `data:image/jpeg;base64,${res.returnImage}`;
      this.car = res;
    });
  }
}
