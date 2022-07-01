import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BGMapRoutingModule } from './b-g-map-routing.module';
import { ShowMapMarkerComponent } from './show-map-marker/show-map-marker.component';
import { SharedUiModule } from 'src/app/shared-ui';


@NgModule({
  declarations: [
    ShowMapMarkerComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    BGMapRoutingModule
  ]
})
export class BGMapModule { }
