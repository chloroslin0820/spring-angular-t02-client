import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookCarComponent } from './components/book-car/book-car.component';
import { NgZorroImportsModules } from '../../NgZorroImportsModules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';

const routes: Routes = [
  { path: 'dashboard', component: CustomerDashboardComponent },
  { path: 'car/:id', component: BookCarComponent },
  { path: 'my_bookings', component: MyBookingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule,
    NgZorroImportsModules,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CustomerRoutingModule {}
