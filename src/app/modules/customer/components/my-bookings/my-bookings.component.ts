import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { CarBookingDto } from '../../../../types';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {
  bookings: CarBookingDto[] = [];
  isSpinning: boolean = false;

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.getMyBookings();
  }

  getMyBookings() {
    this.isSpinning = true;
    this.customerService.getBookingsByUserId().subscribe((res) => {
      this.isSpinning = false;
      this.bookings = res;
      console.log(this.bookings);
    });
  }
}
