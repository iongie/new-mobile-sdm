import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { ListIzinComponent } from './list-izin/list-izin.component';
import { AddIzinComponent } from './add-izin/add-izin.component';
import { ViewIzinComponent } from './view-izin/view-izin.component';
import { ComponentModule } from '~/component/component.module';
import { Routes } from '@angular/router';
import { ActionBarService } from '~/component/action-bar/action-bar.service';
import { ListDataService } from '~/component/list-data/list-data.service';
import { IzinService } from '~/component/form/izin/izin.service';
import { NativeScriptDateTimePickerModule } from '@nativescript/datetimepicker/angular';
import { DatePipe } from '@angular/common';

export const routes: Routes = [
  {
    path: 'add',
    component: AddIzinComponent,
  },
  {
    path: 'list',
    component: ListIzinComponent,
  },
  {
    path: 'edit',
    children: [
      {
        path:':id',
        component: ViewIzinComponent,
      }
    ]
  },
];

@NgModule({
  declarations: [ListIzinComponent, AddIzinComponent, ViewIzinComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes),
    ComponentModule,
    NativeScriptDateTimePickerModule
  ],
  providers: [
    ActionBarService,
    ListDataService,
    IzinService,
    DatePipe
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class IzinModule { }
