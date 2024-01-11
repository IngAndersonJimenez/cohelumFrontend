import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { ContentUserComponent } from './content-user/content-user.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { InventoryModule } from './inventory/inventory.module';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from "@angular/cdk/menu";
import { OverlayModule } from "@angular/cdk/overlay";
import { DashboardContentComponent } from "./dashboard/dashboard-content/dashboard-content.component";
import { MatButtonModule } from "@angular/material/button";
import { ContactComponent } from './contact/contact.component';
import { TagModule } from "primeng/tag";
import { TableModule } from "primeng/table";
import { ChipsModule } from "primeng/chips";
import { MultiSelectModule } from "primeng/multiselect";
import { DropdownModule } from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogModule} from "primeng/dialog";
import {DialogService} from "primeng/dynamicdialog";
import { SubCategoryComponent } from './inventory/products/sub-category/sub-category.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { SettingComponent } from './setting/setting.component';
import { FileUploadModule } from 'primeng/fileupload';
import { SettingSectionComponent } from './setting-section/setting-section.component';
import {TooltipModule} from "primeng/tooltip";


@NgModule({
  declarations: [
    ContentUserComponent,
    DashboardContentComponent,
    ContactComponent,
    SubCategoryComponent,
    SettingComponent,
    SettingSectionComponent
  ],
    imports: [
        CommonModule,
        AuthenticatedRoutingModule,
        DashboardModule,
        InventoryModule,
        CdkMenu,
        OverlayModule,
        CdkMenuTrigger,
        CdkMenuItem,
        MatButtonModule,
        TagModule,
        TableModule,
        ChipsModule,
        MultiSelectModule,
        DropdownModule,
        FormsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatDialogModule,
        DialogModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        FileUploadModule,
        TooltipModule

    ],
    providers: [DialogService],
})
export class AuthenticatedModule { }
