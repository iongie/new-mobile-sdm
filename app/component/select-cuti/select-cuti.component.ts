import { Component, OnDestroy, OnInit } from '@angular/core';
import { BottomSheetParams } from '@nativescript-community/ui-material-bottomsheet/angular';
import { ItemEventData } from '@nativescript/core';
import { Subject } from 'rxjs';
import { SelectCutiService } from './select-cuti.service';

@Component({
  selector: 'app-select-cuti',
  templateUrl: './select-cuti.component.html',
  styleUrls: ['./select-cuti.component.css']
})
export class SelectCutiComponent implements OnInit, OnDestroy {
  items: any[];
  private subs: Subject<void> = new Subject();
  constructor(
    public selectCutiServ: SelectCutiService,
    private params: BottomSheetParams
  ) { }

  ngOnInit(): void {
    this.items = ['Cuti Tahunan', 'Cuti Besar', 'Cuti Melahirkan', 'Cuti Lainnya'];
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  onItemTap(args: ItemEventData) {
    console.log(`Index: ${args.index}; View: ${args.view} ; Item: ${this.items[args.index]}`);
    this.selectCutiServ.changeSelectCuti(this.items[args.index]);
    this.params.closeCallback();
  } 

}
