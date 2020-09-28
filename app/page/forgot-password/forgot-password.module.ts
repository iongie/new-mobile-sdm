import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptRouterModule } from '@nativescript/angular';
import { ForgotPasswordComponent } from './forgot-password.component';

export const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
  },
];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ForgotPasswordModule { }
