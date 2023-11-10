import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { ContentUserComponent } from './content-user/content-user.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { InventoryModule } from './inventory/inventory.module';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from "@angular/cdk/menu";
import {OverlayModule} from "@angular/cdk/overlay";
import {DashboardContentComponent} from "./dashboard/dashboard-content/dashboard-content.component";

@NgModule({
  declarations: [
    ContentUserComponent,
    DashboardContentComponent
  ],
  imports: [
    CommonModule,
    AuthenticatedRoutingModule,
    DashboardModule,
    InventoryModule,
    CdkMenu,
    OverlayModule,
    CdkMenuTrigger,
    CdkMenuItem
  ]
})
export class AuthenticatedModule { }
