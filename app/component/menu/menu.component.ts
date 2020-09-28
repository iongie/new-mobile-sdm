import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Subject } from 'rxjs';
import * as geolocation from "@nativescript/geolocation";
import { Accuracy } from "@nativescript/core/ui/enums";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  constructor(
    private router: RouterExtensions,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  absendenganQr() {
    let that = this;
    geolocation.getCurrentLocation({
        desiredAccuracy: Accuracy.high,
        maximumAge: 5000,
        timeout: 10000
    }).then(function (loc) {
        if (loc) {
            const location = JSON.stringify(loc)
            that.router.navigate(['absen/dengan-qr/'+location]);
        }
    }, function (e) {
        console.log("Error: " + (e.message || e));
    });
  }

  absenManual() {
    let that = this;
    geolocation.getCurrentLocation({
        desiredAccuracy: Accuracy.high,
        maximumAge: 5000,
        timeout: 10000
    }).then(function (loc) {
        if (loc) {
            const location = JSON.stringify(loc)
            that.router.navigate(['absen/dengan-qr/'+location]);
        }
    }, function (e) {
        console.log("Error: " + (e.message || e));
    });
  }

  listAbsen(){
    this.router.navigate(['absen/list'])
  }

  listCuti(){
    this.router.navigate(['cuti/list'])
  }

  listIzin(){
    this.router.navigate(['izin/list'])
  }

  listReimbursement(){
    this.router.navigate(['reimbursement/list'])
  }

}
