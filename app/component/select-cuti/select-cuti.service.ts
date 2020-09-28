import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectCutiService {
  public selectCutiSource= new BehaviorSubject('');
  currentSelectCuti = this.selectCutiSource.asObservable();
  constructor() { }

  changeSelectCuti(data) {
    this.selectCutiSource.next(data);
  }
}
