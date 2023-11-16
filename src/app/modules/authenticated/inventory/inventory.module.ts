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
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import { CreateProductComponent } from './products/create-product/create-product.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConsultProductComponent } from './products/consult-product/consult-product.component';



@NgModule({
  declarations: [
    CategoryComponent,
    GridCategoryComponent,
    CreateProductComponent,
    ConsultProductComponent
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
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class InventoryModule { }
