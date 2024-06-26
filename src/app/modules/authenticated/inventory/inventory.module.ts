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
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CarouselModule} from "primeng/carousel";
import {SharedModule} from "primeng/api";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";



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
        ProgressSpinnerModule,
        PdfViewerModule,
        MatCheckboxModule,
        CarouselModule,
        SharedModule,
        DialogModule,
        ButtonModule,
        MatProgressSpinnerModule,
        CKEditorModule,
    ]
})
export class InventoryModule { }
