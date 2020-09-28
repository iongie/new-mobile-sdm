import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { ComponentModule } from '~/component/component.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    NativeScriptCommonModule,
    ComponentModule
  ],
  exports: [HomeComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
