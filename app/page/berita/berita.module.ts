import { DatePipe } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativeScriptDateTimePickerModule } from '@nativescript/datetimepicker/angular';
import { ActionBarService } from '~/component/action-bar/action-bar.service';
import { ComponentModule } from '~/component/component.module';
import { ListDataService } from '~/component/list-data/list-data.service';
import { ListBeritaComponent } from './list-berita/list-berita.component';
import { ViewBeritaComponent } from './view-berita/view-berita.component';

export const routes: Routes = [
  {
    path: 'list',
    component: ListBeritaComponent,
  },
  {
    path: 'view',
    children: [
      {
        path:':id',
        component: ViewBeritaComponent,
      }
    ]
  },
];

@NgModule({
  declarations: [ListBeritaComponent, ViewBeritaComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes),
    ComponentModule,
    NativeScriptDateTimePickerModule
  ],
  providers: [
    ActionBarService,
    ListDataService,
    DatePipe
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class BeritaModule { }
