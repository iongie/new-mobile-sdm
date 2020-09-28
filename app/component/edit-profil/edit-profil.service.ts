import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditProfilService {
  public editProfilSource= new BehaviorSubject('');
  currentEditProfil = this.editProfilSource.asObservable();
  constructor() { }

  changeEditProfil(data) {
    this.editProfilSource.next(data);
  }
}
