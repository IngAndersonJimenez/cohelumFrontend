import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentUserComponent } from './content-user/content-user.component';
import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
import { CategoryComponent } from './inventory/category/category.component';

const routes: Routes = [
  {
    path: 'content-user',
    component: ContentUserComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardContentComponent
      },
      {
        path: 'inventory',
        component: CategoryComponent
    },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedRoutingModule { }
