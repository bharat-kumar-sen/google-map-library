import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NumberOnlyDirective } from './directives/onlynumber.directive';
import { CharacterOnlyDirective } from './directives/onlycharacter.directive';
import { DisabledDirective } from './directives/disabled.directive';
import { AlertComponent } from './alert';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingComponent } from './loading/loading.component';
import {  } from './loading/loading.component';
import { GrdFilterPipe } from './filters-pipes/grd-filter.pipe';


const SHARED_COMPONENTS: any = [
  NumberOnlyDirective,
  CharacterOnlyDirective,
  DisabledDirective,
  AlertComponent,
  LoadingComponent,
  GrdFilterPipe
];
const SHARED_MODULES: any = [CommonModule, FormsModule, RouterModule, ModalModule.forRoot(),
  BsDropdownModule.forRoot(),];
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
  ],
  providers: [],
  declarations: SHARED_COMPONENTS,
  exports: [SHARED_COMPONENTS, SHARED_MODULES],
  entryComponents: [],
})
export class SharedUiModule {
  static forRoot(): ModuleWithProviders<SharedUiModule> {
    return {
      ngModule: SharedUiModule,
      providers: [],
    };
  }
}
