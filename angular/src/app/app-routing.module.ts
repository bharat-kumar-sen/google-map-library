import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'bharat/add-map-marker', pathMatch: 'full' },
  {
    path: 'bharat',
    loadChildren: () => import('./views/bharat/b-g-map/b-g-map.module').then((mod) => mod.BGMapModule)
  },
  // {
  //   path: 'shireen',
  //   loadChildren: () => import('./views/shireen/b-g-map/b-g-map.module').then((mod) => mod.BGMapModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
