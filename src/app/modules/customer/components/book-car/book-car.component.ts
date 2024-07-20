import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CarBookingDto, CarDto } from '../../../../types';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {
  isSpinning: boolean = false;
  id: number = this.activatedRoute.snapshot.params['id'];
  car: CarDto | null = null;
  processedImage: string | null = null;
  validateForm!: FormGroup;
  dateFormat: string = "dd-MM-yyyy";

  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
    }, { validators: dateRangeValidator() });
    this.getCarById();
  }

  getCarById() {
    this.customerService.getCarById(this.id).subscribe((res) => {
      this.processedImage = `data:image/jpeg;base64,${res.returnImage}`;
      this.car = res;
    });
  }

  postCarBooking(data: any) {
    const fromDate = new Date(data.fromDate);
    const toDate = new Date(data.toDate);
    fromDate.setDate(fromDate.getDate() + 1);
    toDate.setDate(toDate.getDate() + 1);

    this.isSpinning = true;
    let carbookingDto = {
      fromDate: fromDate,
      toDate: toDate,
      userId: StorageService.getUserId()!,
      carId: this.id,
    }

    console.log(carbookingDto);

    this.customerService.postCarBooking(carbookingDto.carId, carbookingDto).subscribe((res) => {
      this.isSpinning = false;
      this.message.success('Car booked successfully', { nzDuration: 3000 });
      this.router.navigateByUrl('customer/dashboard');
    }, (error) => {
      this.isSpinning = false;
      this.message.error('Failed to book car');
    });
  }

  isToDateEarlier(): boolean {
    const fromDate = this.validateForm.get('fromDate')?.value;
    const toDate = this.validateForm.get('toDate')?.value;
    return fromDate && toDate && new Date(toDate) < new Date(fromDate);
  }

  getErrorMessage(controlName: string): string | undefined {
    const control = this.validateForm.get(controlName);
    if (control?.errors?.['dateRange']) {
      return 'To Date must be later than From Date';
    }
    return undefined;
  }
  
}

function dateRangeValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const fromDate = formGroup.get('fromDate')?.value;
    const toDate = formGroup.get('toDate')?.value;

    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      return { dateRange: true };
    }
    return null;
  };
}
