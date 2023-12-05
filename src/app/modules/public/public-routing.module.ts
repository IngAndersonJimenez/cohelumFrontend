import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentPublicComponent } from './content-public/content-public.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  {
    path: 'home',
    component: ContentPublicComponent,
    children: [
      {
        path: 'inventory',
        component: InventoryComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
