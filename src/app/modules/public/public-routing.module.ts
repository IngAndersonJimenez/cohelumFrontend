import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentPublicComponent } from './content-public/content-public.component';

const routes: Routes = [
  {
    path: 'home',
    component: ContentPublicComponent,
    children: [

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
