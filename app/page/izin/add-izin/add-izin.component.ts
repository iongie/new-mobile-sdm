import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Subject } from 'rxjs';
import { ActionBarService } from '~/component/action-bar/action-bar.service';
import { IzinService } from '~/component/form/izin/izin.service';

@Component({
  selector: 'app-add-izin',
  templateUrl: './add-izin.component.html',
  styleUrls: ['./add-izin.component.css']
})
export class AddIzinComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  actionBarData= {
    title: 'Tambah Izin'
  }
  izinData = {
    action: 'tambah',
    text: 'Save'
  }
  constructor(
    public router: RouterExtensions,
    public izin: IzinService,
    public actionBar: ActionBarService,
  ) { }

  ngOnInit(): void {
    this.actionBarAct();
    this.izinAct();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  goBack() {
    this.router.backToPreviousPage();
  }

  addIzin(){
    this.router.navigate(['izin/add']);
  }

  actionBarAct(){
    const data = JSON.stringify(this.actionBarData);
    this.actionBar.changeActionBar(data);
  }

  izinAct(){
    const data = JSON.stringify(this.izinData);
    this.izin.changeFormIzin(data);
  }

}
