import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentUserComponent } from './content-user/content-user.component';
import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
import { CategoryComponent } from './inventory/category/category.component';
import {CreateProductComponent} from "./inventory/products/create-product/create-product.component";
import {ListProductsComponent} from "./inventory/products/list-products/list-products.component";

const routes: Routes = [
  {
    path: 'corporate',
    component: ContentUserComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardContentComponent
      },
      {
        path: 'Category',
        component: CategoryComponent
      },
      {
        path: 'Create-products',
        component: CreateProductComponent
      },
      {
        path: 'List-category',
        component: ListProductsComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule { }
