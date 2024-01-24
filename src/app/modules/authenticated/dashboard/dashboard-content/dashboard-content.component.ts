import {Component, Input, OnInit} from '@angular/core';
import {SettingsService} from "../../../../services/settings.service";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss']
})
export class DashboardContentComponent implements OnInit{

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  constructor(private settingService:SettingsService) {
  }

  isSideNavCollapsed = false;

  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  getBodyclass(): string {
    let styleClass = '';

    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }

  ngOnInit(): void {
    this.settingService.increaseVisitorCount();
  }
  getVisitorCount$() {
    return this.settingService.getVisitorCount$();
  }

  incrementarContador() {
    this.settingService.increaseVisitorCount();
  }

}
