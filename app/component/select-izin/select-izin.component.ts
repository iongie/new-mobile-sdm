import { Component, OnDestroy, OnInit } from '@angular/core';
import { BottomSheetParams } from '@nativescript-community/ui-material-bottomsheet/angular';
import { ItemEventData } from '@nativescript/core';
import { Subject } from 'rxjs';
import { SelectIzinService } from './select-izin.service';

@Component({
  selector: 'app-select-izin',
  templateUrl: './select-izin.component.html',
  styleUrls: ['./select-izin.component.css']
})
export class SelectIzinComponent implements OnInit, OnDestroy {
  items: any[];
  private subs: Subject<void> = new Subject();
  constructor(
    private selectIzinServ: SelectIzinService,
    private params: BottomSheetParams
  ) { }

  ngOnInit(): void {
    this.items = ['Tidak Masuk', 'Keluar Kantor'];
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  onItemTap(args: ItemEventData) {
    console.log(`Index: ${args.index}; View: ${args.view} ; Item: ${this.items[args.index]}`);
    this.selectIzinServ.changetSelectIzin(this.items[args.index]);
    this.params.closeCallback();
  }

}
