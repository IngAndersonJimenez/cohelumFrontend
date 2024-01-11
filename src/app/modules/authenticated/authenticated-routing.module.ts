import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
import { CategoryComponent } from './inventory/category/category.component';
import { CreateProductComponent } from "./inventory/products/create-product/create-product.component";
import { ConsultProductComponent } from "./inventory/products/consult-product/consult-product.component";
import { ContactComponent } from "./contact/contact.component";
import { SubCategoryComponent } from "./inventory/products/sub-category/sub-category.component";
import { SettingComponent } from './setting/setting.component';
import {SettingSectionComponent} from "./setting-section/setting-section.component";

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardContentComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'sub-category', component: SubCategoryComponent },
      { path: 'create-products', component: CreateProductComponent },
      { path: 'consult-product', component: ConsultProductComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'setting-section', component: SettingSectionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule { }
