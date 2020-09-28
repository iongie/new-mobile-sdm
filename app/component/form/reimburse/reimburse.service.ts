import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReimburseService {
  public formReimburseSource= new BehaviorSubject('');
  currentFormReimburse = this.formReimburseSource.asObservable();
  constructor() { }

  changeFormReimburse(data) {
    this.formReimburseSource.next(data);
  }
}
