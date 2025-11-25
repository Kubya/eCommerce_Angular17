import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


// Admin Guard (Before Login)
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardLogin implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = localStorage.getItem('role');

    if (role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
      return false;
    }

    return true;
  }
}
// Admin After Login Guard
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = localStorage.getItem('role');

    if (role === 'admin') {
      return true;
    }

    this.router.navigate(['/admin-login']);
    return false;
  }
}

// Buyer + Seller Before Login
@Injectable({
  providedIn: 'root'
})
export class SellerBuyerAuthGuardLogin implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = localStorage.getItem('role');

    if (role === 'seller') {
      this.router.navigate(['/seller-dashboard']);
      return false;
    }

    if (role === 'buyer') {
      this.router.navigate(['/buyer-dashboard']);
      return false;
    }

    return true;
  }
}

// Buyer After Login
@Injectable({
  providedIn: 'root'
})
export class BuyerAuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = localStorage.getItem('role');

    if (role === 'buyer') {
      return true;
    }

    this.router.navigate(['/sign-in']);
    return false;
  }
}

// seller after login
@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = localStorage.getItem('role');

    if (role === 'seller') {
      return true;
    }

    this.router.navigate(['/sign-in']);
    return false;
  }
}


