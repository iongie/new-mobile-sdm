import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { AlertService } from '~/alert/alert.service';

@Component({
  selector: 'app-view-berita',
  templateUrl: './view-berita.component.html',
  styleUrls: ['./view-berita.component.css']
})
export class ViewBeritaComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  dataBerita;
  constructor(
    public routerExtensions: RouterExtensions,
    public activeRoutes: ActivatedRoute,
    public accessApiService: AccessApiService,
    public alert: AlertService
  ) { }

  ngOnInit(): void {
    this.viewById();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  viewById() {
    this.activeRoutes.params.subscribe(params => {
      this.viewBerita(params.id)
    })
  }

  viewBerita(id){
    this.accessApiService.getByIdWithToken(id, 'api')
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      this.dataBerita = res;
    },err => {
      this.alert.errorMessage(err)
    })
  }

  goBack() {
    this.routerExtensions.backToPreviousPage();
  }

}
