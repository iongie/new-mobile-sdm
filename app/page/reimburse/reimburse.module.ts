import { DatePipe } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
;import { NativeScriptDateTimePickerModule } from '@nativescript/datetimepicker/angular';
import { ActionBarService } from '~/component/action-bar/action-bar.service';
import { ComponentModule } from '~/component/component.module';
import { ReimburseService } from '~/component/form/reimburse/reimburse.service';
import { ListDataService } from '~/component/list-data/list-data.service';
import { AddReimburseComponent } from './add-reimburse/add-reimburse.component';
import { ListReimburseComponent } from './list-reimburse/list-reimburse.component';
import { ViewReimburseComponent } from './view-reimburse/view-reimburse.component';

export const routes: Routes = [
  {
    path: 'add',
    component: AddReimburseComponent,
  },
  {
    path: 'list',
    component: ListReimburseComponent,
  },
  {
    path: 'edit',
    children: [
      {
        path:':id',
        component: ViewReimburseComponent,
      }
    ]
  },
];

@NgModule({
  declarations: [AddReimburseComponent, ListReimburseComponent, ViewReimburseComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule.forChild(routes),
    ComponentModule,
    NativeScriptDateTimePickerModule
  ],
  providers: [
    ActionBarService,
    ListDataService,
    ReimburseService,
    DatePipe
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ReimburseModule { }
