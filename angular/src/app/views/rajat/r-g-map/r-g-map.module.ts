import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiModule } from 'src/app/shared-ui';
import { RGMapRoutingModule } from './r-g-map-routing.module';
import { ShowMapMarkerComponent } from './show-map-marker/show-map-marker.component';
import { CrudLocationsComponent } from './crud-locations/crud-locations.component';

@NgModule({
  declarations: [
    ShowMapMarkerComponent,
    CrudLocationsComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    RGMapRoutingModule,
  ]
})
export class RGMapModule { }
