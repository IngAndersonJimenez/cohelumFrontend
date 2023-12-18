import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public/home',
    pathMatch: 'full'
  },
  {
    path: 'public',
    loadChildren: () => import('./modules/public/public.module').then((m) => m.PublicModule)
  },
  {
    path: 'corporate',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
      },
      {
        path: 'authenticated',
        loadChildren: () => import('./modules/authenticated/authenticated.module').then((m) => m.AuthenticatedModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'public/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

