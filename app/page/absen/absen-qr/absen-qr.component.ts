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
  selector: 'app-absen-qr',
  templateUrl: './absen-qr.component.html',
  styleUrls: ['./absen-qr.component.css']
})
export class AbsenQrComponent implements OnInit, OnDestroy {
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
    public datePipe: DatePipe,
    public accessApiService: AccessApiService,
    public alert: AlertService,
    private barcodeScanner: BarcodeScanner,
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
  
  absen(){
    this.barcodeScanner.scan({
        formats: "QR_CODE, EAN_13",
        cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
        cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
        message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
        showFlipCameraButton: true,   // default false
        preferFrontCamera: false,     // default false
        showTorchButton: true,        // default false
        beepOnScan: true,             // Play or Suppress beep on scan (default true)
        torchOn: false,               // launch with the flashlight on (default false)
        closeCallback: () => { console.log("Scanner closed")}, // invoked when the scanner was closed (success or abort)
        resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
        // orientation: orientation,     // Android only, default undefined (sensor-driven orientation), other options: portrait|landscape
        openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
    }).then(res => {
        console.log(res);  
    }).catch(err => {
        console.log("No scan. " + err);
        this.barcodeScanner.stop()
    })
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
