import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'bharat/add-map-marker', pathMatch: 'full' },
  {
    path: 'bharat',
    loadChildren: () => import('./views/bharat/b-g-map/b-g-map.module').then((mod) => mod.BGMapModule)
  },
  {
    path: 'shireen',
    loadChildren: () => import('./views/shireen/s-g-map/s-g-map.module').then((mod) => mod.SGMapModule)
  },
  {
    path: 'rajat',
    loadChildren: () => import('./views/rajat/r-g-map/r-g-map.module').then((mod) => mod.RGMapModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
