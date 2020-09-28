import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApplicationSettings } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';

@Injectable({
  providedIn: 'root'
})
export class AktivasiGuard implements CanActivate {
  constructor(
    private router: RouterExtensions
  ){ }

  isRegistrate() {
    return  ApplicationSettings.getString('registrasi') !== undefined;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.isRegistrate()) {
        return true;
      }else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
