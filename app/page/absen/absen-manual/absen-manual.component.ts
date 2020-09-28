import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { AlertService } from '~/alert/alert.service';

@Component({
  selector: 'app-absen-manual',
  templateUrl: './absen-manual.component.html',
  styleUrls: ['./absen-manual.component.css']
})
export class AbsenManualComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  dataAbsen = {
    nik: '',
    location: '',
    tanggal: '',
    jam: '',
    type: ''
  };
  constructor(
    public routerExtensions: RouterExtensions,
    private activeRoute: ActivatedRoute,
    private barcodeScanner: BarcodeScanner,
    public datePipe: DatePipe,
    public accessApiService: AccessApiService,
    public alert: AlertService
  ) { }

  ngOnInit(): void {
    this.dataQr();
    this.dataAbsen.nik = "000000000";
    this.dataAbsen.tanggal = this.datePipe.transform(Date.now(), 'yyyy/MM/dd');
    this.dataAbsen.jam = this.datePipe.transform(Date.now(), 'h:mm a');
    console.log(this.dataAbsen.jam);
    (this.dataAbsen.jam > '2.00 PM')? this.dataAbsen.type = "Out": this.dataAbsen.type = "In"; 
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

  dataQr(){
    this.activeRoute.params.subscribe(params => {
      const loc = JSON.parse(params.id)
      this.dataAbsen.location = loc.latitude + ',' + loc.longitude;
    });
  }

  save(){
    this.accessApiService.addWithToken(this.dataAbsen, 'api')
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      this.alert.successMessage(res);
      this.routerExtensions.navigate(['dashboard']);
    },err => {
      this.alert.errorMessage(err)
    })
  }

}
