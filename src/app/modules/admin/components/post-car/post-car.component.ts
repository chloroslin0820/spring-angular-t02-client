import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss',
})
export class PostCarComponent {
  isSpinning: boolean = false;
  postCarForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
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
    private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      type: [null, [Validators.required]],
      color: [null, [Validators.required]],
      transmission: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
      description: [null],
      year: [null, [Validators.required]],
    });
  }

  postCar() {
    const formData = new FormData();
    this.isSpinning = true;

    formData.append('image', this.selectedFile as Blob);
    formData.append('name', this.postCarForm.value.name);
    formData.append('brand', this.postCarForm.value.brand);
    formData.append('type', this.postCarForm.value.type);
    formData.append('color', this.postCarForm.value.color);
    formData.append('price', this.postCarForm.value.price);
    formData.append('description', this.postCarForm.value.description);
    formData.append('year', this.postCarForm.value.year);
    formData.append('transmission', this.postCarForm.value.transmission);
    
    this.adminService.postCar(formData).subscribe((res) => {
      this.isSpinning = false;
      this.message.success('Car posted successfully', { nzDuration: 5000 });
      this.router.navigateByUrl('/admin/dashboard');
    },(error) => {
      this.message.error('Failed to post car', { nzDuration: 5000 });
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile as Blob);
  }
}
