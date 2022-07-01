import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SGMapRoutingModule } from './s-g-map-routing.module';
import { ShowMapMarkerComponent } from './show-map-marker/show-map-marker.component';
import { SharedUiModule } from 'src/app/shared-ui';

@NgModule({
  declarations: [
    ShowMapMarkerComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    SGMapRoutingModule
  ]
})

export class SGMapModule { }
