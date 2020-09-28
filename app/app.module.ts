import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptHttpClientModule } from '@nativescript/angular';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

@NgModule({
  declarations: [
      AppComponent,
  ],
  imports: [
      NativeScriptModule,
      AppRoutingModule,
      NativeScriptHttpClientModule,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

