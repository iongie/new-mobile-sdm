import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptMaterialCardViewModule } from '@nativescript-community/ui-material-cardview/angular';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { EditProfilService } from './edit-profil/edit-profil.service';
import { MenuComponent } from './menu/menu.component';
import { PenawaranMenarikComponent } from './penawaran-menarik/penawaran-menarik.component';
import { TahukahKamuComponent } from './tahukah-kamu/tahukah-kamu.component';
import { ListDataComponent } from './list-data/list-data.component';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { IzinComponent } from './form/izin/izin.component';
import { CutiComponent } from './form/cuti/cuti.component';
import { ReimburseComponent } from './form/reimburse/reimburse.component';
import { IzinService } from './form/izin/izin.service';
import { ReimburseService } from './form/reimburse/reimburse.service';
import { ListDataService } from './list-data/list-data.service';
import { CutiService } from './form/cuti/cuti.service';
import { ActionBarService } from './action-bar/action-bar.service';
import { DatePipe } from '@angular/common';
import { SelectIzinComponent } from './select-izin/select-izin.component';
import { SelectCutiComponent } from './select-cuti/select-cuti.component';
import { SelectIzinService } from './select-izin/select-izin.service';
import { SelectCutiService } from './select-cuti/select-cuti.service';
import { NativeScriptMaterialBottomSheetModule } from '@nativescript-community/ui-material-bottomsheet/angular';


@NgModule({
  declarations: [
    EditProfilComponent, 
    MenuComponent, 
    PenawaranMenarikComponent, 
    TahukahKamuComponent, 
    ListDataComponent, 
    ActionBarComponent, 
    IzinComponent, 
    CutiComponent, 
    ReimburseComponent, SelectIzinComponent, SelectCutiComponent
  ],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptMaterialCardViewModule,
    NativeScriptMaterialBottomSheetModule
  ],
  exports:[
    EditProfilComponent, 
    MenuComponent, 
    PenawaranMenarikComponent, 
    TahukahKamuComponent,
    ListDataComponent,
    ActionBarComponent,
    IzinComponent, 
    CutiComponent, 
    ReimburseComponent
  ],
  providers: [
    EditProfilService,
    ActionBarService,
    IzinService,
    ReimburseService,
    CutiService,
    ListDataService,
    SelectIzinService,
    SelectCutiService,
    DatePipe
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ComponentModule { }
