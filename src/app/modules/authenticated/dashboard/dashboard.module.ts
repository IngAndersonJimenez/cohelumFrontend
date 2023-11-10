import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardSideComponent } from './dashboard-side/dashboard-side.component';
import { SharedModule } from '../../shared/shared.module';
import { SublevelMenuComponent } from './dashboard-side/sublevel-menu.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import {CdkMenu, CdkMenuItem, CdkMenuTrigger} from "@angular/cdk/menu";
import {OverlayModule} from "@angular/cdk/overlay";

@NgModule({
  declarations: [

    DashboardSideComponent,
    SublevelMenuComponent,
    DashboardHeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CdkMenu,
    OverlayModule,
    CdkMenuTrigger,
    CdkMenuItem
  ],
  exports: [
    DashboardHeaderComponent,
    DashboardSideComponent,

  ]
})
export class DashboardModule { }
