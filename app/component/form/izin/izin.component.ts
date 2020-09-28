import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { BottomSheetService, BottomSheetOptions } from '@nativescript-community/ui-material-bottomsheet/angular';
import { RouterExtensions } from '@nativescript/angular';
import { takePicture } from '@nativescript/camera';
import { Image  } from '@nativescript/core/ui/image';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { AlertService } from '~/alert/alert.service';
import { SelectIzinComponent } from '~/component/select-izin/select-izin.component';
import { SelectIzinService } from '~/component/select-izin/select-izin.service';
import { IzinService } from './izin.service';

@Component({
  selector: 'app-izin',
  templateUrl: './izin.component.html',
  styleUrls: ['./izin.component.css']
})
export class IzinComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  image;
  dataFormIzin = {
    jenisIzin: '',
    startDate: '',
    endDate: '',
    time: '',
    deskripsi: ''
  }
  data;
  constructor(
    private datePipe: DatePipe,
    private containerRef: ViewContainerRef,
    private accessApi: AccessApiService,
    private alert: AlertService,
    private IzinServ: IzinService,
    private selectIzinServ: SelectIzinService,
    private router: RouterExtensions,
    private bottomSheet: BottomSheetService, 
  ) { }

  ngOnInit(): void {
    this.image = "res://placeholder";
    this.dataFormIzin.jenisIzin = 'Jenis Izin';
    this.dataFormIzin.startDate = this.datePipe.transform(new Date(), 'yyyy/MM/dd');
    this.dataFormIzin.endDate = this.datePipe.transform(new Date(), 'yyyy/MM/dd');
    this.dataFormIzin.time = this.datePipe.transform(new Date(), 'h:mm a');
    this.getData();
    this.jenisIzin();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getData(){
    this.IzinServ.currentFormIzin
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      this.data = JSON.parse(res);
    })
  }

  jenisIzin(){
    this.selectIzinServ.currentSelectIzin
    .pipe(takeUntil(this.subs))
    .subscribe(jenisIzin => {
      console.log("result jenis cuti", jenisIzin);
      this.dataFormIzin.jenisIzin = jenisIzin;
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

  selectIzin(){
    const options: BottomSheetOptions = {
      viewContainerRef: this.containerRef
    };

    this.bottomSheet.show(SelectIzinComponent, options).subscribe(result => {
        console.log('Option selected:', result);
    });
  }

  save(){
    this.dataFormIzin.time = this.datePipe.transform(this.dataFormIzin.time, 'h:mm a');
    // !--dengan API
    // this.accessApi.addWithToken(this.dataFormIzin, 'api')
    // .pipe(takeUntil(this.subs))
    // .subscribe(res => {
    //   this.alert.successMessage(res);
    //   this.router.navigate(['izin/list']);
    // },err => {
    //   this.alert.errorMessage(err)
    // })
    // !--dengan API
  }

  update(){
    this.dataFormIzin.time = this.datePipe.transform(this.dataFormIzin.time, 'h:mm a');
    // !--dengan API
    // this.accessApi.addWithToken(this.dataFormIzin, 'api')
    // .pipe(takeUntil(this.subs))
    // .subscribe(res => {
    //   this.alert.successMessage(res);
    //   this.router.navigate(['izin/list']);
    // },err => {
    //   this.alert.errorMessage(err)
    // })
    // !--dengan API
  }

}
