import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptMaterialBottomSheetModule } from '@nativescript-community/ui-material-bottomsheet/angular';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { AccessApiService } from '~/access-api/access-api.service';
import { AlertService } from '~/alert/alert.service';
import { ComponentModule } from '~/component/component.module';
import { EditProfilService } from '~/component/edit-profil/edit-profil.service';
import { ProfilComponent } from './profil.component';



@NgModule({
  declarations: [ProfilComponent],
  imports: [
    NativeScriptCommonModule,
    ComponentModule,
    NativeScriptMaterialBottomSheetModule
  ],
  exports:[ProfilComponent],
  providers: [
    EditProfilService,
    AlertService,
    AccessApiService
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProfilModule { }
