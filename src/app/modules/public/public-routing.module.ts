import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentPublicComponent } from './content-public/content-public.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';

const routes: Routes = [
  {
    path: 'content',
    component: ContentPublicComponent,
    children: [
      {
        path: 'inventory',
        component: InventoryComponent,
        data: { title: 'Inventory' } 
      },
      {
        path: 'inventory-detail',
        component: InventoryDetailComponent,
        data: { title: 'Inventory Detail' } 
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
