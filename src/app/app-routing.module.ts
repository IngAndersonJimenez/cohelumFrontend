import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { ContentUserComponent } from './modules/authenticated/content-user/content-user.component';
import { UsComponent } from './modules/public/us/us.component';
import { InventoryComponent } from './modules/public/inventory/inventory.component';
import { InventoryDetailComponent } from './modules/public/inventory-detail/inventory-detail.component';
import {
  DashboardContentComponent
} from "./modules/authenticated/dashboard/dashboard-content/dashboard-content.component";

const routes: Routes = [

  {
    path: '', redirectTo: 'home/content', pathMatch: 'full'
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/public/public.module').then((m) => m.PublicModule)
      }
    ]
  },

  {
    path: 'Us',
    component: UsComponent
  },

  {
    path: 'Inventory',
    component: InventoryComponent
  },

  {
    path: 'detail',
    component: InventoryDetailComponent
  },

  {
    path: 'corporate',
    component: ContentUserComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/authenticated/authenticated.module').then((m) => m.AuthenticatedModule)
      }
    ]
  },
  {
    path: 'corporate',
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home/content',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false, /*enableTracing: true*/ })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

