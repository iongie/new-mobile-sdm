import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActionBarService } from './action-bar.service';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  data;
  constructor(
    public actionBarServ: ActionBarService,
    public router: RouterExtensions
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getData(){
    this.actionBarServ.currentActionBar
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
        this.data = JSON.parse(res);
    })
  }

  goBack() {
    this.router.backToPreviousPage();
  }

  addIzin(){
    this.router.navigate(['izin/add']);
  }

  addCuti(){
    this.router.navigate(['cuti/add']);
  }

  addReimburse(){
    this.router.navigate(['reimbursement/add']);
  }

}
