import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ComponentModule } from '~/component/component.module';
import { NotifikasiComponent } from './notifikasi.component';



@NgModule({
  declarations: [NotifikasiComponent],
  imports: [
    NativeScriptCommonModule,
    ComponentModule
  ],
  exports: [NotifikasiComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NotifikasiModule { }
