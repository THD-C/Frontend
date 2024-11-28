import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { RouterExtendedService } from '../../services/router-extended/router-extended.service';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  return handleAuth(route, state);
};

function handleAuth(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const auth = inject(AuthService);
  const routerExtended = inject(RouterExtendedService);

  if (auth.isAuthenticated) {
    return true;
  }

  routerExtended.navigateToLogin(state.url);
  return false;
}