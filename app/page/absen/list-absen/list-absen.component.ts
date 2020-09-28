import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { AlertService } from '~/alert/alert.service';
import { ActionBarService } from '~/component/action-bar/action-bar.service';
import { ListDataService } from '~/component/list-data/list-data.service';

@Component({
  selector: 'app-list-absen',
  templateUrl: './list-absen.component.html',
  styleUrls: ['./list-absen.component.css']
})
export class ListAbsenComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  listDataData = {
    data: []
  }
  constructor(
    public routerExtensions: RouterExtensions, 
    public listData: ListDataService,
    public actionBar: ActionBarService,
    public accessApi: AccessApiService,
    public alert: AlertService
  ) { }

  ngOnInit(): void {
    this.listDataAct();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
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
