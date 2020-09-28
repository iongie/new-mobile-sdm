import { Component, OnDestroy, OnInit } from '@angular/core';
import { BottomSheetParams } from '@nativescript-community/ui-material-bottomsheet/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditProfilService } from './edit-profil.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  profil= {
    dataEditing: ''
  }
  dataSharing = {
    form: '',
    value: '',
    labelText: '',
    textFieldkeyboardType: '',
    textFieldHint: ''
  }
  constructor(
    public editProfilServ: EditProfilService,
    private params: BottomSheetParams
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getData() {
    this.editProfilServ.currentEditProfil
    .pipe(takeUntil(this.subs))
    .subscribe(result => {
      this.dataSharing = JSON.parse(result);
      console.log('data', this.dataSharing);
    })
  }

  forUpdate(){
    this.params.closeCallback();
    this.editProfilServ.changeEditProfil('edit');
  }

}
