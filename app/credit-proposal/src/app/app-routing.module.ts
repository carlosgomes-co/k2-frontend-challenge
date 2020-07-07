import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'register'
  },
  {
    path: 'register',
    pathMatch: 'full',
    data: { page: 1 },
    loadChildren: () => import('@register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'register/credit-proposal/loading',
    data: { page: 0 },
    loadChildren: () => import('@register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'register/credit-proposal/about-you',
    data: { page: 2 },
    loadChildren: () => import('@register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'register/credit-proposal/your-situation',
    data: { page: 3 },
    loadChildren: () => import('@register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'register/credit-proposal/your-income',
    data: { page: 4 },
    loadChildren: () => import('@register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'register/credit-proposal/result',
    data: { page: 5 },
    loadChildren: () => import('@register/register.module').then(m => m.RegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
