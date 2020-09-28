import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccessApiService } from '~/access-api/access-api.service';
import { AlertService } from '~/alert/alert.service';

@Component({
  selector: 'app-tahukah-kamu',
  templateUrl: './tahukah-kamu.component.html',
  styleUrls: ['./tahukah-kamu.component.css']
})
export class TahukahKamuComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  dataBerita = [];
  constructor(
    private routerExtensions: RouterExtensions,
    public accessApiService: AccessApiService,
    public alert: AlertService
  ) { }

  ngOnInit(): void {
    this.berita();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  berita(){
    this.accessApiService.getWithToken('jabatan/getalljabatan')
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      this.dataBerita = res.data;
    }, err => {
      this.alert.errorMessage(err);
    })
  }

  listBerita(){
    this.routerExtensions.navigate(['berita/list'])
  }

  viewBerita(){
    this.routerExtensions.navigate(['berita/view/1']);
  }

}
