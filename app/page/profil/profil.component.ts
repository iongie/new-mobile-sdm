import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { BottomSheetOptions, BottomSheetService } from '@nativescript-community/ui-material-bottomsheet/angular';
import { RouterExtensions } from '@nativescript/angular';
import { takePicture } from '@nativescript/camera';
import { ApplicationSettings } from '@nativescript/core';
import { Image  } from '@nativescript/core/ui/image';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { AlertService } from '~/alert/alert.service';
import { EditProfilComponent } from '~/component/edit-profil/edit-profil.component';
import { EditProfilService } from '~/component/edit-profil/edit-profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  image;
  dataIzin = [];
  action ='';
  constructor(
    private routerExtensions: RouterExtensions,
    private bottomSheet: BottomSheetService, 
    private containerRef: ViewContainerRef,
    private accessAPi: AccessApiService,
    private editProfilServ: EditProfilService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.image = "res://placeholder";
    // this.profile();
    this.balikanEdit();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  balikanEdit(){
    this.editProfilServ.currentEditProfil
    .pipe(takeUntil(this.subs))
    .subscribe(balikan => {
      (balikan == '')? this.action = 'cancel':this.action = balikan; 
      console.log('balikan', balikan);
    })
  }

  profile(){
    this.accessAPi.getWithToken('jabatan/getalljabatan')
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      this.dataIzin = res.data;
    }, err => {
      this.alert.errorMessage(err);
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

  editName(){
    const data = {
      form: 'TextField',
      value: 'Gigih Santoso',
      labelText: 'Name',
      textFieldkeyboardType: 'email',
      textFieldHint: 'Name'
    };
    this.editProfilServ.changeEditProfil(JSON.stringify(data))
    const options: BottomSheetOptions = {
      viewContainerRef: this.containerRef
      };

      this.bottomSheet.show(EditProfilComponent, options).subscribe(result => {
          console.log('Option selected:', result);
      });
  }
  
  editTelephone(){
    const data = {
      form: 'TextField',
      value: '+62896-8316-577',
      labelText: 'Telephone',
      textFieldkeyboardType: 'email',
      textFieldHint: 'Telephone'
    };
    this.editProfilServ.changeEditProfil(JSON.stringify(data))
    const options: BottomSheetOptions = {
      viewContainerRef: this.containerRef
      };

      this.bottomSheet.show(EditProfilComponent, options).subscribe(result => {
          console.log('Option selected:', result);
      });
  }

  editAlamat(){
    const data = {
      form: 'TextView',
      value: 'Jalan Pendidikan 1 004/004 No.59. Parigi Lama, Pondok Aren. Tangerang Selatan',
      labelText: 'Alamat',
      textFieldkeyboardType: 'email',
      textFieldHint: 'Alamat'
    };
    this.editProfilServ.changeEditProfil(JSON.stringify(data))
    const options: BottomSheetOptions = {
      viewContainerRef: this.containerRef
      };

      this.bottomSheet.show(EditProfilComponent, options).subscribe(result => {
          console.log('Option selected:', result);
      });
  }
  

  gantiPassword() {
    const options: BottomSheetOptions = {
      viewContainerRef: this.containerRef
    };

    this.bottomSheet.show(EditProfilComponent, options).subscribe(result => {
        console.log('Option selected:', result);
    });
  }

  cancel(){
    this.action = 'cancel'
  }

  logout(){
    ApplicationSettings.remove('login');
    this.routerExtensions.navigate(['pin']);
  }

}
