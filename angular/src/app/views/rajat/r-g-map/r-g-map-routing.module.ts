import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudLocationsComponent } from './crud-locations/crud-locations.component';
import { ShowMapMarkerComponent } from './show-map-marker/show-map-marker.component';

const routes: Routes = [
  { path: 'add-map-marker/:rType', component: ShowMapMarkerComponent, pathMatch: 'full' },
  { path: 'crud-map-marker', component: CrudLocationsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RGMapRoutingModule { }
