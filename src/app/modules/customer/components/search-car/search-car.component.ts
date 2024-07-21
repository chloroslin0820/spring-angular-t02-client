import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarDto } from '../../../../types';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss',
})
export class SearchCarComponent {
  searchCarForm!: FormGroup;
  isSpinning = false;
  listOfOption: Array<{ value: string; label: string }> = [];
  listOfBrands = [
    'BMW',
    'AUDI',
    'FERRARI',
    'TESLA',
    'VOLVO',
    'TOYOTA',
    'HONDA',
    'FORD',
    'NISSAN',
    'HYUNDAI',
    'LEXUS',
    'KIA',
  ];
  listOfTypes = ['Petrol', 'Hybrid', 'Diesel', 'Electric', 'CNG'];
  listOfColors = [
    'Red',
    'White',
    'Blue',
    'Black',
    'Orange',
    'Grey',
    'Silver',
    'Green',
    'Yellow',
    'Purple',
    'Brown',
  ];
  listOfTransmissions = ['Manual', 'Automatic'];
  cars: CarDto[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
  ) {
    this.searchCarForm = this.formBuilder.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null],
    });
  }

  searchCar() {
    this.cars = [];
    this.isSpinning = true;
    this.customerService
      .searchCar(this.searchCarForm.value)
      .subscribe((res: any) => {
        res.carDtoList.forEach((car: any) => {
          car.processedImage = 'data:image/jpeg;base64,' + car.returnImage;
          this.cars.push(car);
        });
        this.isSpinning = false;
      });
  }
}
