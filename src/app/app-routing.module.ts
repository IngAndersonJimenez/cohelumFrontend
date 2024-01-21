import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentUserComponent } from './modules/authenticated/content-user/content-user.component';
import { UsComponent } from './modules/public/us/us.component';
import { InventoryComponent } from './modules/public/inventory/inventory.component';
import { InventoryDetailComponent } from './modules/public/inventory-detail/inventory-detail.component';
import { permissionsGuard } from './guard/permissions.guard';
import {ExtendedWarrantyComponent} from "./modules/public/extended-warranty/extended-warranty.component";

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
    path: 'extended-warranty',
    component: ExtendedWarrantyComponent
  },

  {
    path: 'Inventory',
    component: InventoryComponent
  },

  {
    path: 'Detail',
    component: InventoryDetailComponent
  },

  {
    path: 'corporate',
    component: ContentUserComponent,
    canActivateChild: [permissionsGuard],
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

