import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListDataService {
  public listDataSource= new BehaviorSubject('');
  currentListData = this.listDataSource.asObservable();
  constructor() { }

  changeListData(data) {
    this.listDataSource.next(data);
  }
}
