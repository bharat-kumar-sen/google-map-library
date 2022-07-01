import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowMapMarkerComponent } from './show-map-marker/show-map-marker.component';

const routes: Routes = [
  { path: '', component: ShowMapMarkerComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BGMapRoutingModule { }
