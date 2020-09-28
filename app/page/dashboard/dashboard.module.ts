import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { HomeModule } from '../home/home.module';
import { NotifikasiModule } from '../notifikasi/notifikasi.module';
import { ProfilModule } from '../profil/profil.module';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes),
    HomeModule,
    ProfilModule,
    NotifikasiModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class DashboardModule { }
