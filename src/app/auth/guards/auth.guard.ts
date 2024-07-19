import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(StorageService);
  const router = inject(Router);

  if (StorageService.isAdminLoggedIn() || StorageService.isCustomerLoggedIn()) {
    return true;
  } else {
    router.navigateByUrl('/');
    return false;
  }
};
