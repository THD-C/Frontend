import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { RouterExtendedService } from '../../services/router-extended/router-extended.service';

export const bloggerGuard: CanActivateFn = (route, state) => {
  return handleBlogger(route, state);
};

function handleBlogger(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  const auth = inject(AuthService);
  const router = inject(RouterExtendedService);

  if (auth.isAuthenticated && auth.canManageBlog) {
    return true;
  }

  router.navigate(['/blog/posts']);
  return false;
}
