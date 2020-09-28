import { DatePipe } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativeScriptDateTimePickerModule } from '@nativescript/datetimepicker/angular';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { ComponentModule } from '~/component/component.module';
import { AbsenManualComponent } from './absen-manual/absen-manual.component';
import { AbsenQrComponent } from './absen-qr/absen-qr.component';
import { ListAbsenComponent } from './list-absen/list-absen.component';

export const routes: Routes = [
  {
    path: 'dengan-qr',
    children: [
      {
        path:':id',
        component: AbsenQrComponent,
      }
    ]
  },
  {
    path: 'tanpa-qr',
    children: [
      {
        path:':id',
        component: AbsenManualComponent,
      }
    ]
  },
  {
    path: 'list',
    component: ListAbsenComponent,
  },
];

@NgModule({
  declarations: [AbsenManualComponent, AbsenQrComponent, ListAbsenComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forChild(routes),
    NativeScriptDateTimePickerModule,
    ComponentModule
  ],
  providers:[
    DatePipe,
    BarcodeScanner
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AbsenModule { }
