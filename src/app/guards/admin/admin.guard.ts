import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { RouterExtendedService } from '../../services/router-extended/router-extended.service';

import { UserType } from '../../shared/models/user.model';

export const adminGuard: CanActivateFn = (route, state) => {
  return handleAdmin(route, state);
};

function handleAdmin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const auth = inject(AuthService);
  const routerExtended = inject(RouterExtendedService);

  if (auth.isAuthenticated && auth.userType === UserType.Admin) {
    return true;
  }

  routerExtended.navigateToHome();
  return false;
}
