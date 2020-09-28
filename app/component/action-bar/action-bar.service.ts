import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionBarService {
  public actionBarSource= new BehaviorSubject('');
  currentActionBar = this.actionBarSource.asObservable();
  constructor() { }

  changeActionBar(data) {
    this.actionBarSource.next(data);
  }
}
