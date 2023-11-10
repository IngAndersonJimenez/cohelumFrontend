import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { ContentPublicComponent } from './content-public/content-public.component';
import { HeaderPublicComponent } from './header-public/header-public.component';


@NgModule({
  declarations: [
    ContentPublicComponent,
    HeaderPublicComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
