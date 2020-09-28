import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { takePicture } from '@nativescript/camera';
import { Image  } from '@nativescript/core/ui/image';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { AlertService } from '~/alert/alert.service';
import { ReimburseService } from './reimburse.service';

@Component({
  selector: 'app-reimburse',
  templateUrl: './reimburse.component.html',
  styleUrls: ['./reimburse.component.css']
})
export class ReimburseComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  image;
  dataFormReimburse = {
    date: '',
    deskripsi: ''
  }
  data;
  constructor(
    private datePipe: DatePipe,
    private accessApi: AccessApiService,
    private alert: AlertService,
    private ReimburseServ: ReimburseService,
    private router: RouterExtensions
  ) { }

  ngOnInit(): void {
    this.image = "res://placeholder";
    this.dataFormReimburse.date = this.datePipe.transform(new Date(), 'yyyy/MM/dd');
    this.getData();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getData(){
    this.ReimburseServ.currentFormReimburse
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      this.data = JSON.parse(res);
    })
  }

  takeCam() {
    takePicture({ width: 300, height: 300, keepAspectRatio: true, saveToGallery:false })
    .then(imageAsset => {
      let image = new Image();
      image.src = imageAsset;
      this.image = image.src;
    })
    .catch(e => {
      console.log('error:', e);
    });
  }

  save(){
    // !--dengan API
    this.accessApi.addWithToken(this.dataFormReimburse, 'api')
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      this.alert.successMessage(res);
      this.router.navigate(['izin/list']);
    },err => {
      this.alert.errorMessage(err)
    })
    // !--dengan API
  }

  update(){
    // !--dengan API
    this.accessApi.addWithToken(this.dataFormReimburse, 'api')
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      this.alert.successMessage(res);
      this.router.navigate(['izin/list']);
    },err => {
      this.alert.errorMessage(err)
    })
    // !--dengan API
  }

}
