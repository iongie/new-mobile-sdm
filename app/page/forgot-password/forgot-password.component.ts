import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { AlertService } from '~/alert/alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  dataForgotPassword = {
    email: ''
  }
  constructor(
    public routerExtensions: RouterExtensions,
    public page: Page,
    public accessApi: AccessApiService,
    public alert: AlertService
  ) { 
    page.actionBarHidden = true;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  back(){
    this.routerExtensions.backToPreviousPage();
  }

  forgotPassword(){
    const data = {
      email: this.dataForgotPassword.email
    };
    this.routerExtensions.navigate(['/login']);
    // this.accessApi.login(data)
    // .pipe(takeUntil(this.subs))
    // .subscribe(res => {
    //   this.routerExtensions.navigate(['/login']);
    //   this.alert.successMessage(res);
    // },err => {
    //   this.alert.errorMessage(err)
    // })
  }
}
