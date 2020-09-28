import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { ActionBarService } from '~/component/action-bar/action-bar.service';
import { CutiService } from '~/component/form/cuti/cuti.service';

@Component({
  selector: 'app-view-cuti',
  templateUrl: './view-cuti.component.html',
  styleUrls: ['./view-cuti.component.css']
})
export class ViewCutiComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  actionBarData= {
    title: 'Edit Cuti'
  }
  izinData = {
    action: 'edit',
    text: 'Update'
  }
  constructor(
    public router: RouterExtensions,
    public cuti: CutiService,
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
      //   this.cuti.changeFormCuti(data);
      // })
    })
  }

  actionBarAct(){
    const data = JSON.stringify(this.actionBarData);
    this.actionBar.changeActionBar(data);
  }

}
