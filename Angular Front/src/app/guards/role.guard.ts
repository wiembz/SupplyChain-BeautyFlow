import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const requiredRoles = route.data['roles'];
    
    if (!this.auth.hasRole(requiredRoles)) {
      return this.router.createUrlTree(['/access-denied'], {
        queryParams: { 
          attempted: route.url.join('/'),
          required: Array.isArray(requiredRoles) ? requiredRoles.join(',') : requiredRoles
        }
      });
    }
    return true;
  }
}