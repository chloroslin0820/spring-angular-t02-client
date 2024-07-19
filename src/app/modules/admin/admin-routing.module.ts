import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCarComponent } from './components/post-car/post-car.component';
import { NgZorroImportsModules } from '../../NgZorroImportsModules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'car', component: PostCarComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
    NgZorroImportsModules,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminRoutingModule { }
