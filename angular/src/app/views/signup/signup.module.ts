import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiModule } from '../../shared-ui';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedUiModule

  ]
})
export class SignupModule { }
