import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { ContentPublicComponent } from './content-public/content-public.component';
import { HeaderPublicComponent } from './header-public/header-public.component';
import { FooterPublicComponent } from './footer-public/footer-public.component';
import { SliderHomeComponent } from './slider-home/slider-home.component';
import { AlliesPublicComponent } from './allies-public/allies-public.component';
import { ProductPublicComponent } from './product-public/product-public.component';
import { TeamPublicComponent } from './team-public/team-public.component';

@NgModule({
  declarations: [
    ContentPublicComponent,
    HeaderPublicComponent,
    FooterPublicComponent,
    SliderHomeComponent,
    AlliesPublicComponent,
    ProductPublicComponent,
    TeamPublicComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
