import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { ContentUserComponent } from './content-user/content-user.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { InventoryModule } from './inventory/inventory.module';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from "@angular/cdk/menu";
import {OverlayModule} from "@angular/cdk/overlay";

@NgModule({
  declarations: [
    ContentUserComponent
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
