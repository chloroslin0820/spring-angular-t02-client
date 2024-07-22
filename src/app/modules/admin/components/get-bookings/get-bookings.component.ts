import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CarBookingDto } from '../../../../types';

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.scss'
})
export class GetBookingsComponent {
  isSpinning = false;
  bookings: CarBookingDto[] = [];


  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.isSpinning = true;
    this.adminService.getCarBookings().subscribe(
      (res) => {
        this.isSpinning = false;
        this.bookings = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  changeBookingStatus = (bookingId: number, status: string) => {
    
  }
}
