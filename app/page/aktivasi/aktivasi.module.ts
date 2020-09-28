import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';
import { AktivasiComponent } from './aktivasi.component';
import { NativeScriptMaterialCardViewModule } from '@nativescript-community/ui-material-cardview/angular';

export const routes: Routes = [
  {
    path: '',
    component: AktivasiComponent,
  },
];

@NgModule({
  declarations: [AktivasiComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forChild(routes),
    NativeScriptMaterialCardViewModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AktivasiModule { }
