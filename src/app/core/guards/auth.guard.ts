import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const url: string = state.url;

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['dashboardlogin']);
    return false;
  }
};