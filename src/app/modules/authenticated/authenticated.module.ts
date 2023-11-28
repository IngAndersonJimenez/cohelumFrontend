import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { ContentUserComponent } from './content-user/content-user.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { InventoryModule } from './inventory/inventory.module';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from "@angular/cdk/menu";
import {OverlayModule} from "@angular/cdk/overlay";
import {DashboardContentComponent} from "./dashboard/dashboard-content/dashboard-content.component";
import {MatButtonModule} from "@angular/material/button";
import { ContactComponent } from './contact/contact.component';
import {TagModule} from "primeng/tag";
import {TableModule} from "primeng/table";
import {ChipsModule} from "primeng/chips";
import {MultiSelectModule} from "primeng/multiselect";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    ContentUserComponent,
    DashboardContentComponent,
    ContactComponent
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
        ButtonModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatIconModule
    ]
})
export class AuthenticatedModule { }
