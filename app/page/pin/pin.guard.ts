import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationSettings } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';

@Injectable({
  providedIn: 'root'
})
export class PinGuard implements CanActivate {

  constructor(
    private router: RouterExtensions
  ){ }


  isLoggedIn() {
    return ApplicationSettings.getString('login') !== undefined;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.isLoggedIn()) {
        return true;
      }else {
        this.router.navigate(['/pin']);
        return false;
      }
  }
  
}
