import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './layout/content/content.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cohelum',
    pathMatch: 'full'
  },
  {
    path: 'cohelum',
    component: ContentComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule)
      },
      {
        path: 'authenticated',
        loadChildren: () =>
          import('./modules/authenticated/authenticated.module').then((m) => m.AuthenticatedModule)
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
