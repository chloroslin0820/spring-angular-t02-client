import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from '../../../../types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss'
})
export class UpdateCarComponent {

  isSpinning: boolean = false;
  carId: number = this.activatedRoute.snapshot.params['id'];
  existingImage: string | null = null;
  updateForm!: FormGroup;
  listOfOptions: Array<{ label: string; value: string }> = [];
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
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      type: [null, [Validators.required]],
      color: [null, [Validators.required]],
      transmission: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
      description: [null],
      year: [null, [Validators.required]],
    })
    this.getCarById();
  }

  getCarById() {
    this.isSpinning = true;
    this.adminService.getCarById(this.carId)
      .subscribe((res) => {
        this.isSpinning = false;
        const carDto: CarDto = res;
        this.existingImage = 'data:image/jpeg;base64,' + carDto.returnImage;
        console.log(carDto, carDto.returnImage);
        this.updateForm.patchValue(carDto);
      });
  }

  onFileSelected(event: any) {}
}
