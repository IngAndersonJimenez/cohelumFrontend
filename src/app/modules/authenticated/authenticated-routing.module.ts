import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
import { CategoryComponent } from './inventory/category/category.component';
import { CreateProductComponent } from "./inventory/products/create-product/create-product.component";
import { ConsultProductComponent } from "./inventory/products/consult-product/consult-product.component";
import { ContactComponent } from "./contact/contact.component";
import { SubCategoryComponent } from "./inventory/products/sub-category/sub-category.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardContentComponent,
    children: [
      { path: 'category', component: CategoryComponent },
      { path: 'sub-category', component: SubCategoryComponent },
      { path: 'create-products', component: CreateProductComponent },
      { path: 'consult-product', component: ConsultProductComponent },
      { path: 'contact', component: ContactComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule { }
