import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentPublicComponent } from './content-public/content-public.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import {UsComponent} from "./us/us.component";

const routes: Routes = [
  {
    path: 'home',
    component: ContentPublicComponent,
    children: [
      {
        path: 'inventory',
        component: InventoryComponent
      },
      {
        path: 'inventoryDetail',
        component: InventoryDetailComponent
      },
      {
        path: 'us',
        component: UsComponent
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
