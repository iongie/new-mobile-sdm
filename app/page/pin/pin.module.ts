import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptMaterialCardViewModule } from '@nativescript-community/ui-material-cardview/angular';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';
import { PinComponent } from './pin.component';

export const routes: Routes = [
  {
    path: '',
    component: PinComponent,
  },
];

@NgModule({
  declarations: [PinComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forChild(routes),
    NativeScriptMaterialCardViewModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class PinModule { }
