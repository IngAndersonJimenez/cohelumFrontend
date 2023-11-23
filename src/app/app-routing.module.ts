import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },{
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/public/public.module').then((m) => m.PublicModule)
      }
    ]
  },
  {
    path: 'cohelum',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule)
      },
      {
        path: '',
        loadChildren: () =>
          import('./modules/authenticated/authenticated.module').then((m) => m.AuthenticatedModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
