import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'signup',
 loadChildren: ()=> import('./views/signup/signup.module').then( (mod)=> mod.SignupModule)
},
  {path: 'login',
  loadChildren: ()=> import('./views/login/login.module').then( (mod)=> mod.LoginModule)
 },
  {path: 'products',
loadChildren: ()=> import('./products/products.module').then( (mod)=> mod.ProductsModule)
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
