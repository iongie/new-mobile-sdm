import { Component } from '@angular/core';
import { requestPermissions } from '@nativescript/camera';
import * as geolocation from "@nativescript/geolocation";
import { connectionType, startMonitoring } from '@nativescript/core/connectivity';


@Component({
  selector: 'app-root',
  template: `<GridLayout><page-router-outlet></page-router-outlet></GridLayout>`
})
export class AppComponent {
  constructor() {
    this.reqPermission();
    this.enableGps();
  }

  reqPermission(){
    requestPermissions().then(x => {
      console.log("Permission granted!",x);
    }).catch(x => {
        console.log("Permission is not granted (sadface)", x);
    });

    startMonitoring(newConnectionType => {
      switch (newConnectionType) {
          case connectionType.none:
              console.log("Connection type changed to none.");
              break;
          case connectionType.wifi:
              console.log("Connection type changed to WiFi.");
              break;
          case connectionType.mobile:
              console.log("Connection type changed to mobile.");
              break;
          case connectionType.ethernet:
              console.log("Connection type changed to ethernet.");
              break;
          case connectionType.bluetooth:
              console.log("Connection type changed to bluetooth.");
              break;
          default:
              break;
      }
    })
  }

  enableGps(){
    geolocation.isEnabled().then(function (isEnabled) {
        if (!isEnabled) {
          geolocation.enableLocationRequest(true, true).then(() => {
              console.log("User Enabled Location Service");
          }, (e) => {
              console.log("Error: " + JSON.stringify(e));
          }).catch(ex => {
              console.log("Unable to Enable Location", ex);
          });
        }
    }, function (e) {
        console.log("Error: " + (e.message || e));
    });
  }
}
