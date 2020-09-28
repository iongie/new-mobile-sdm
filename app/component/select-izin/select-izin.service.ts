import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectIzinService {
  public selectIzinSource= new BehaviorSubject('');
  currentSelectIzin = this.selectIzinSource.asObservable();
  constructor() { }

  changetSelectIzin(data) {
    this.selectIzinSource.next(data);
  }
}
