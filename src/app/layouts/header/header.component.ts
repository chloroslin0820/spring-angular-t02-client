import { Component } from '@angular/core';
import { StorageService } from '../../auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn();
  isMenuOpen: boolean = false;
  isMenuItemOpen: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    StorageService.clearUserStorage();
    this.router.events.subscribe((event) => {
      // if (event.constructor.name === 'NavigationEnd') {
      if (StorageService.getUser()?.userRole === 'Admin') {
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
      } else if (StorageService.getUser()?.userRole === 'Customer') {
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
      // }
    });
  }

  logout() {
    StorageService.clearUserStorage();
    this.router.navigateByUrl('/login');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isMenuItemOpen = true;
  }

  toggleMenuItem() {
    this.isMenuItemOpen = !this.isMenuItemOpen;
  }
}
