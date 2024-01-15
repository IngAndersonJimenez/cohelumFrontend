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
import { MaterialModule } from '../material/material.module';
import { ContactComponent } from './contact/contact.component';
import { PaginatorModule } from "primeng/paginator";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InventoryComponent } from "./inventory/inventory.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenubarModule } from 'primeng/menubar';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import { ImageModule } from 'primeng/image';
import { UsComponent } from './us/us.component';
import {SlickCarouselModule} from "ngx-slick-carousel";
import { CascadeSelectModule } from 'primeng/cascadeselect';

@NgModule({
  declarations: [
    ContentPublicComponent,
    HeaderPublicComponent,
    FooterPublicComponent,
    SliderHomeComponent,
    AlliesPublicComponent,
    ProductPublicComponent,
    TeamPublicComponent,
    ShowcasePublicComponent,
    ContactComponent,
    InventoryComponent,
    InventoryDetailComponent,
    UsComponent
  ],
    imports: [
        CommonModule,
        PublicRoutingModule,
        CarouselModule,
        GalleriaModule,
        MaterialModule,
        PaginatorModule,
        ReactiveFormsModule,
        MultiSelectModule,
        DropdownModule,
        MatDialogModule,
        MatButtonModule,
        DataViewModule,
        TagModule,
        RatingModule,
        FormsModule,
        ReactiveFormsModule,
        RadioButtonModule,
        MenubarModule,
        ImageModule,
        SlickCarouselModule,
        CascadeSelectModule
    ],
  exports: [
    HeaderPublicComponent,
    FooterPublicComponent
  ] 
})
export class PublicModule { }
