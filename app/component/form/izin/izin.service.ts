import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IzinService {
  public formIzinSource= new BehaviorSubject('');
  currentFormIzin = this.formIzinSource.asObservable();
  constructor() { }

  changeFormIzin(data) {
    this.formIzinSource.next(data);
  }
}
