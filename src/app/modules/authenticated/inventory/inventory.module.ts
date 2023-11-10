import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from "@angular/cdk/menu";
import {OverlayModule} from "@angular/cdk/overlay";
import { GridCategoryComponent } from './grid-category/grid-category.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";


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
        CdkMenuItem,
        MatTableModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule
    ]
})
export class InventoryModule { }
