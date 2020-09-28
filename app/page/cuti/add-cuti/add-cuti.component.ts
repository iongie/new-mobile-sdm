import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Subject } from 'rxjs';
import { ActionBarService } from '~/component/action-bar/action-bar.service';
import { CutiService } from '~/component/form/cuti/cuti.service';

@Component({
  selector: 'app-add-cuti',
  templateUrl: './add-cuti.component.html',
  styleUrls: ['./add-cuti.component.css']
})
export class AddCutiComponent implements OnInit, OnDestroy {
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
    public cuti: CutiService,
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

  addCuti(){
    this.router.navigate(['cuti/list']);
  }

  actionBarAct(){
    const data = JSON.stringify(this.actionBarData);
    this.actionBar.changeActionBar(data);
  }

  izinAct(){
    const data = JSON.stringify(this.izinData);
    this.cuti.changeFormCuti(data);
  }
}
