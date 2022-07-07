import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowMapMarkerComponent } from './show-map-marker/show-map-marker.component';

const routes: Routes = [
  { path: 'add-map-marker/:type', component: ShowMapMarkerComponent, pathMatch: 'full' },
  { path: 'add-db-marker/:type', component: ShowMapMarkerComponent, pathMatch: 'full' },
  { path: 'drag-drop-marker/:type', component: ShowMapMarkerComponent, pathMatch: 'full' }
];

// const routes: Routes = [
//   { path: '', component: ShowMapMarkerComponent, pathMatch: 'full' },
//   { path: ':id', component: ShowMapMarkerComponent, pathMatch: 'full' },
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SGMapRoutingModule { }
