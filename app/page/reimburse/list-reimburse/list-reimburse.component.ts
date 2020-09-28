import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { AlertService } from '~/alert/alert.service';
import { ActionBarService } from '~/component/action-bar/action-bar.service';
import { ListDataService } from '~/component/list-data/list-data.service';

@Component({
  selector: 'app-list-reimburse',
  templateUrl: './list-reimburse.component.html',
  styleUrls: ['./list-reimburse.component.css']
})
export class ListReimburseComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  actionBarData= {
    title: 'Daftar Reimbursement',
    actionItem: 'tambah reimbursement',
  };
  listDataData = {
    data: []
  }
  constructor(
    public listData: ListDataService,
    public actionBar: ActionBarService,
    public accessApi: AccessApiService,
    public alert: AlertService,
    public router: RouterExtensions
  ) { }

  ngOnInit(): void {
    this.actionBarAct();
    this.listDataAct();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  goBack() {
    this.router.backToPreviousPage();
  }

  actionBarAct(){
    const data = JSON.stringify(this.actionBarData);
    this.actionBar.changeActionBar(data);
  }

  listDataAct(){
    // !--dengan api
    // this.accessApi.getWithToken('api')
    // .pipe(takeUntil(this.subs))
    // .subscribe(res => {
    //   const data = JSON.stringify(this.listDataData);
    //   this.listData.changeListData(data);
    // }, err => {
    //   this.alert.errorMessage(err);
    // })
    // !--dengan api
    const data = JSON.stringify(this.listDataData);
    this.listData.changeListData(data);
  }

}
