import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
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
  listOfColors = ['Red', 'White', 'Blue', 'Black', 'Orange', 'Grey', 'Silver', 'Green', 'Yellow', 'Purple', 'Brown'];
  listOfTransmissions = ['Manual', 'Automatic'];

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.searchCarForm = this.formBuilder.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null],
    });
  }

  searchCar() {
    this.isSpinning = true;
    console.log(this.searchCarForm.value);
  }
}
