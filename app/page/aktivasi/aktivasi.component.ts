import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AccessApiService } from '~/access-api/access-api.service';
import { AlertService } from '~/alert/alert.service';
import { ApplicationSettings, Page } from '@nativescript/core';
import { takeUntil } from 'rxjs/operators';
import { Device } from '@nativescript/core/platform';

@Component({
  selector: 'app-aktivasi',
  templateUrl: './aktivasi.component.html',
  styleUrls: ['./aktivasi.component.css']
})
export class AktivasiComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  data = [];
  check = [
    {
      text: 'far'
    },
    {
      text: 'far'
    },
    {
      text: 'far'
    },
    {
      text: 'far'
    }
  ]
  number;
  stringRef = String;
  constructor(
    public router: Router,
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

  addPin(ev) {
    this.number = ev;
    this.data.push(this.number);
    this.check[this.data.length - 1].text = 'fas';
    if (this.data.length == 4) {
      ApplicationSettings.setString('registrasi', 'registrasi success');
      this.router.navigate(['dashboard']);
      // const data = {
      //   pin: this.data[0]+this.data[1]+this.data[2]+this.data[3],
      //   nik: '01380183018301',
      //   uuid: Device.uuid
      // }
      // this.accessApi.addWithToken(data, 'auth/login')
      // .pipe(takeUntil(this.subs))
      // .subscribe(res => {
      //   ApplicationSettings.setString('registrasi', 'registrasi success');
      //   this.alert.successMessage(res);
      //   this.router.navigate(['dashboard']);
      // },err => { 
      //   this.alert.errorMessage(err)
      // })
    }
  }

  removePin(){
    if(this.data.length == 4){
      this.check[this.data.length - 1].text = 'far';
      this.data = this.data.slice(0,3)
    } else if(this.data.length == 3){
      this.check[this.data.length - 1].text = 'far';
      this.data = this.data.slice(0,2)
    } else if(this.data.length == 2){
      this.check[this.data.length - 1].text = 'far';
      this.data = this.data.slice(0,1)
    } else if(this.data.length == 1){
      this.check[this.data.length - 1].text = 'far';
      this.data = []
    } else{
      this.check[this.data.length - 1].text = 'far';
      this.data = [];
    }
  }

}
