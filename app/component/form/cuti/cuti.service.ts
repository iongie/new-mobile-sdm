import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CutiService {
  public formCutiSource= new BehaviorSubject('');
  currentFormCuti = this.formCutiSource.asObservable();
  constructor() { }

  changeFormCuti(data) {
    this.formCutiSource.next(data);
  }
}
