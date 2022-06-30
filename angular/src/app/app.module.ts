import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedUiModule } from './shared-ui';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    SharedUiModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true,
      preventDuplicates: true,
    }),

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
