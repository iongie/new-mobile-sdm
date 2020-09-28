import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { AlertService } from '~/alert/alert.service';
import { ApplicationSettings } from '@nativescript/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  dataLogin = {
    nik: '',
    password: ''
  }
  constructor(
    public router: RouterExtensions,
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

  login(){
    const data = {
      username: this.dataLogin.nik,
      password: this.dataLogin.password
    };
    this.router.navigate(['/aktivasi']);
    // this.accessApi.login(data)
    // .pipe(takeUntil(this.subs))
    // .subscribe(res => {
    //   ApplicationSettings.setString('token', res.data.token);
    //   this.router.navigate(['/aktivasi']);
    // }, err => {
    //   this.alert.errorMessage(err)
    // })
  }
  
  forgotPassword(){
    this.router.navigate(['/forgot-password']);
  }

}
