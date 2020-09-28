import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Subject } from 'rxjs';
import { ActionBarService } from '~/component/action-bar/action-bar.service';
import { ReimburseService } from '~/component/form/reimburse/reimburse.service';

@Component({
  selector: 'app-add-reimburse',
  templateUrl: './add-reimburse.component.html',
  styleUrls: ['./add-reimburse.component.css']
})
export class AddReimburseComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  actionBarData= {
    title: 'Tambah Reimbursement'
  }
  izinData = {
    action: 'tambah',
    text: 'Save'
  }
  constructor(
    public router: RouterExtensions,
    public reimbursement: ReimburseService,
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

  addReimburse(){
    this.router.navigate(['reimbursement/list']);
  }

  actionBarAct(){
    const data = JSON.stringify(this.actionBarData);
    this.actionBar.changeActionBar(data);
  }

  izinAct(){
    const data = JSON.stringify(this.izinData);
    this.reimbursement.changeFormReimburse(data);
  }

}
