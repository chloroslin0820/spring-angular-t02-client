import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from '../../../../types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss',
})
export class UpdateCarComponent {
  isSpinning: boolean = false;
  carId: number = this.activatedRoute.snapshot.params['id'];
  imgChanged: boolean = false;
  selectedFile: any;
  imagePreview: any;
  existingImage: string | null = null;
  originalCarDto: CarDto | null = null;
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

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      type: [null, [Validators.required]],
      color: [null, [Validators.required]],
      transmission: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
      description: [''],
      year: [null, [Validators.required]],
    });
    this.getCarById();
  }

  getCarById() {
    this.isSpinning = true;
    this.adminService.getCarById(this.carId).subscribe((res) => {
      this.isSpinning = false;
      const carDto: CarDto = res;
      this.existingImage = 'data:image/jpeg;base64,' + carDto.returnImage;
      this.updateForm.patchValue(carDto);
      this.originalCarDto = carDto;
    });
  }

  updateCar() {
    this.isSpinning = true;
    const formData = new FormData();

    if (this.imgChanged && this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    formData.append('name', this.updateForm.value.name);
    formData.append('brand', this.updateForm.value.brand);
    formData.append('type', this.updateForm.value.type);
    formData.append('color', this.updateForm.value.color);
    formData.append('price', this.updateForm.value.price);
    formData.append('description', this.updateForm.value.description);
    formData.append('year', new Date(this.updateForm.value.year).toString());
    formData.append('transmission', this.updateForm.value.transmission);

    this.adminService.updateCar(this.carId, formData).subscribe(
      (res) => {
        this.isSpinning = false;
        this.message.success('Car updated successfully', { nzDuration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      },
      (error) => {
        this.message.error('Failed to update car', { nzDuration: 5000 });
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imgChanged = true;
    this.existingImage = null;
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
