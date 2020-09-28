import { Injectable } from '@angular/core';
import * as dialogs from "@nativescript/core/ui/dialogs";
import { ApplicationSettings } from '@nativescript/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alert(title, message){
    dialogs.alert({
      title: title,
      message: message,
      okButtonText: "Close"
    }).then(() => {
        console.log("Dialog closed!");
    });
  }

  errorMessage(err){
    (err.error.status == '404')?
    this.alert('Alert', JSON.stringify(err.error.message)):
    this.alert('Alert', JSON.stringify(err.error.status))

    if(err.error.status == '401')
    {
      this.alert('Alert', JSON.stringify(err.error.message));
      if(err.error.message == "Expired token"){
        ApplicationSettings.remove('token');
      }
    }
  }

  successMessage(res){
    if(res.status == '200'){
      this.alert('Success', JSON.stringify(res.message))
    }
  }
}
