import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { ActionBarService } from '~/component/action-bar/action-bar.service';
import { ReimburseService } from '~/component/form/reimburse/reimburse.service';

@Component({
  selector: 'app-view-reimburse',
  templateUrl: './view-reimburse.component.html',
  styleUrls: ['./view-reimburse.component.css']
})
export class ViewReimburseComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  actionBarData= {
    title: 'Edit Reimburse'
  }
  izinData = {
    action: 'edit',
    text: 'Update'
  }
  constructor(
    public router: RouterExtensions,
    public reimburse: ReimburseService,
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
      //   this.reimburse.changeFormReimburse(data);
      // })
    })
  }

  actionBarAct(){
    const data = JSON.stringify(this.actionBarData);
    this.actionBar.changeActionBar(data);
  }
}
