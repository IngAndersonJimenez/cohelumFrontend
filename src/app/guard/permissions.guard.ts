import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const permissionsGuard: CanMatchFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  let status: boolean = false;

  authService.userCurrent.subscribe(
    data => {

      if (data.token != '') {
        status = true
      }
    }
  );

  if (status == false) {
    router.navigate(["/home"]);
    return false;
  }

  return status;

};
