import { Component, OnDestroy, OnInit } from '@angular/core';
import { FloatingActionButton } from '@nativescript-community/ui-material-floatingactionbutton';
import { registerElement, RouterExtensions } from '@nativescript/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ListDataService } from './list-data.service';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css']
})
export class ListDataComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  data;
  routerLink;
  constructor(
    public listData: ListDataService, 
    public router: RouterExtensions
  ) { 
    registerElement('MDFloatingActionButton', () => FloatingActionButton);
  }

  ngOnInit(): void {
    this.getdata();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getdata(){
    this.listData.currentListData
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      this.routerLink = JSON.parse(res).router;
      this.data = JSON.parse(res);
    })
  }

}
