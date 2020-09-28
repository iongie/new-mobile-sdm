import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { AlertService } from '~/alert/alert.service';
import { ActionBarService } from '~/component/action-bar/action-bar.service';
import { IzinService } from '~/component/form/izin/izin.service';
import { ListDataService } from '~/component/list-data/list-data.service';

@Component({
  selector: 'app-list-izin',
  templateUrl: './list-izin.component.html',
  styleUrls: ['./list-izin.component.css']
})
export class ListIzinComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  actionBarData= {
    title: 'Daftar Izin',
    actionItem: 'tambah izin',
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
    this.listDataData = {
      data: [
        {
          tanggal: '24 Mei 1929',
          headTitle: 'TIdak Masuk',
          status: 'Approve',
          title: '',
          desc: 'Karena Sakit Malaria Disarankan untuk istirahat selama 12 hari'
        },
        {
          tanggal: '24 Mei 1929',
          headTitle: 'TIdak Masuk',
          status: 'Approve',
          title: '',
          desc: 'Karena Sakit Tipus Disarankan untuk istirahat selama 12 hari'
        }
      ]
    };
    const data = JSON.stringify(this.listDataData);
    this.listData.changeListData(data);
  }

}
