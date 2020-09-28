import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';
import { PinGuard } from './page/pin/pin.guard';
import { AktivasiGuard } from './page/aktivasi/aktivasi.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path:'login',
    loadChildren: () => import('./page/login/login.module').then(m => m.LoginModule),
  },
  {
    path:'aktivasi',
    loadChildren: () => import('./page/aktivasi/aktivasi.module').then(m => m.AktivasiModule),
  },
  {
    path:'forgot-password',
    loadChildren: () => import('./page/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },
  {
    path:'pin',
    loadChildren: () => import('./page/pin/pin.module').then(m => m.PinModule),
    canActivate: [AktivasiGuard]
  },
  {
    path:'dashboard',
    loadChildren: () => import('./page/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [PinGuard]
  },
  {
    path:'izin',
    loadChildren: () => import('./page/izin/izin.module').then(m => m.IzinModule),
    canActivate: [PinGuard]
  },
  {
    path:'cuti',
    loadChildren: () => import('./page/cuti/cuti.module').then(m => m.CutiModule),
    canActivate: [PinGuard]
  },
  {
    path:'reimbursement',
    loadChildren: () => import('./page/reimburse/reimburse.module').then(m => m.ReimburseModule),
    canActivate: [PinGuard]
  },
  {
    path:'absen',
    loadChildren: () => import('./page/absen/absen.module').then(m => m.AbsenModule),
    canActivate: [PinGuard]
  },
  {
    path:'berita',
    loadChildren: () => import('./page/berita/berita.module').then(m => m.BeritaModule),
    canActivate: [PinGuard]
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
