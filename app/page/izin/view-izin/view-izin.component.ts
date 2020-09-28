import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { ActionBarService } from '~/component/action-bar/action-bar.service';
import { IzinService } from '~/component/form/izin/izin.service';

@Component({
  selector: 'app-view-izin',
  templateUrl: './view-izin.component.html',
  styleUrls: ['./view-izin.component.css']
})
export class ViewIzinComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  actionBarData= {
    title: 'Edit Izin'
  }
  izinData = {
    action: 'edit',
    text: 'Update'
  }
  constructor(
    public router: RouterExtensions,
    public izin: IzinService,
    public actionBar: ActionBarService,
    public activeRoute: ActivatedRoute,
    public accessApi: AccessApiService
  ) { }

  ngOnInit(): void {
    this.actionBarAct();
    this.viewById();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  viewById(){
    this.activeRoute.params
    .pipe(takeUntil(this.subs))
    .subscribe(params => {
      const data ={
        id: params.id
      }
      // this.accessApi.getByIdWithToken(data, 'api')
      // .pipe(takeUntil(this.subs))
      // .subscribe(res => {
      //   const data = JSON.stringify(res);
      //   this.izin.changeFormIzin(data);
      // })
    })
  }

  actionBarAct(){
    const data = JSON.stringify(this.actionBarData);
    this.actionBar.changeActionBar(data);
  }

}
