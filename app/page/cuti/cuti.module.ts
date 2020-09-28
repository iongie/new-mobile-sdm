import { DatePipe } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativeScriptDateTimePickerModule } from '@nativescript/datetimepicker/angular';
import { ActionBarService } from '~/component/action-bar/action-bar.service';
import { ComponentModule } from '~/component/component.module';
import { CutiService } from '~/component/form/cuti/cuti.service';
import { ListDataService } from '~/component/list-data/list-data.service';
import { AddCutiComponent } from './add-cuti/add-cuti.component';
import { ListCutiComponent } from './list-cuti/list-cuti.component';
import { ViewCutiComponent } from './view-cuti/view-cuti.component';

export const routes: Routes = [
  {
    path: 'add',
    component: AddCutiComponent,
  },
  {
    path: 'list',
    component: ListCutiComponent,
  },
  {
    path: 'edit',
    children: [
      {
        path:':id',
        component: ViewCutiComponent,
      }
    ]
  },
];

@NgModule({
  declarations: [AddCutiComponent, ListCutiComponent, ViewCutiComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes),
    ComponentModule,
    NativeScriptDateTimePickerModule
  ],
  providers: [
    ActionBarService,
    ListDataService,
    CutiService,
    DatePipe
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CutiModule { }
