import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { BottomSheetOptions, BottomSheetService } from '@nativescript-community/ui-material-bottomsheet/angular';
import { RouterExtensions } from '@nativescript/angular';
import { takePicture } from '@nativescript/camera';
import { Image  } from '@nativescript/core/ui/image';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { AlertService } from '~/alert/alert.service';
import { SelectCutiComponent } from '~/component/select-cuti/select-cuti.component';
import { SelectCutiService } from '~/component/select-cuti/select-cuti.service';
import { CutiService } from './cuti.service';

@Component({
  selector: 'app-cuti',
  templateUrl: './cuti.component.html',
  styleUrls: ['./cuti.component.css']
})
export class CutiComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  image;
  dataFormCuti = {
    jenisCuti: '',
    startDate: '',
    endDate: '',
    deskripsi: ''
  }
  data;
  constructor(
    private datePipe: DatePipe,
    private accessApi: AccessApiService,
    private alert: AlertService,
    private cutiServ: CutiService,
    private router: RouterExtensions,
    private containerRef: ViewContainerRef,
    private bottomSheet: BottomSheetService, 
    private selectCutiServ: SelectCutiService
  ) { }

  ngOnInit(): void {
    this.image = "res://placeholder";
    this.dataFormCuti.jenisCuti = 'Jenis Izin';
    this.dataFormCuti.startDate = this.datePipe.transform(new Date(), 'yyyy/MM/dd');
    this.dataFormCuti.endDate = this.datePipe.transform(new Date(), 'yyyy/MM/dd');
    this.getData();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getData(){
    this.cutiServ.currentFormCuti
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

  jenisCuti(){
    this.selectCutiServ.currentSelectCuti.subscribe(jenisCuti => {
      console.log("result jenis cuti", jenisCuti);
      this.dataFormCuti.jenisCuti = jenisCuti;
    })
  }

  selectCuti(){
    const options: BottomSheetOptions = {
      viewContainerRef: this.containerRef
    };

    this.bottomSheet.show(SelectCutiComponent, options).subscribe(result => {
        console.log('Option selected:', result);
    });
  }

  save(){
    // !--dengan API
    this.accessApi.addWithToken(this.dataFormCuti, 'api')
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
    this.accessApi.addWithToken(this.dataFormCuti, 'api')
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
