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
import { CarouselModule } from 'primeng/carousel';
import { ShowcasePublicComponent } from './showcase-public/showcase-public.component';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    ContentPublicComponent,
    HeaderPublicComponent,
    FooterPublicComponent,
    SliderHomeComponent,
    AlliesPublicComponent,
    ProductPublicComponent,
    TeamPublicComponent,
    ShowcasePublicComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    CarouselModule,
    GalleriaModule
  ]
})
export class PublicModule { }
