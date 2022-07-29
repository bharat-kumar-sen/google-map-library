import {
  CUSTOM_ELEMENTS_SCHEMA,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NumberOnlyDirective } from './directives/onlynumber.directive';
import { CharacterOnlyDirective } from './directives/onlycharacter.directive';
import { DisabledDirective } from './directives/disabled.directive';
import { AlertComponent } from './alert';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTablesModule } from 'angular-datatables';
import { LoadingComponent } from './loading/loading.component';
import {} from './loading/loading.component';
import { GrdFilterPipe } from './filters-pipes/grd-filter.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

const SHARED_COMPONENTS: any = [
  NumberOnlyDirective,
  CharacterOnlyDirective,
  DisabledDirective,
  AlertComponent,
  LoadingComponent,
  GrdFilterPipe,
];
const SHARED_MODULES: any = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  ModalModule,
  DataTablesModule,
  BsDropdownModule.forRoot(),
  BsDropdownModule.forRoot(),
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      closeButton: true,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  declarations: SHARED_COMPONENTS,
  exports: [SHARED_COMPONENTS, SHARED_MODULES],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedUiModule {
  static forRoot(): ModuleWithProviders<SharedUiModule> {
    return {
      ngModule: SharedUiModule,
      providers: [],
    };
  }
}
