import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsCrudComponent } from './locations-crud/locations-crud.component';
import { ShowMapMarkerComponent } from './show-map-marker/show-map-marker.component';

const routes: Routes = [
  { path: 'add-map-marker/:type', component: ShowMapMarkerComponent, pathMatch: 'full' },
  { path: 'locations-crud', component: LocationsCrudComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SGMapRoutingModule { }
