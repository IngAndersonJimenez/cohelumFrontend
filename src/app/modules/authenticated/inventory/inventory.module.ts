import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from "@angular/cdk/menu";
import {OverlayModule} from "@angular/cdk/overlay";
import { GridCategoryComponent } from './grid-category/grid-category.component';


@NgModule({
  declarations: [
    CategoryComponent,
    GridCategoryComponent
  ],
  imports: [
    CommonModule,
    CdkMenu,
    OverlayModule,
    CdkMenuTrigger,
    CdkMenuItem
  ]
})
export class InventoryModule { }
