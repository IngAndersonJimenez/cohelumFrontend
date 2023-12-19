import { Component, Input } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-content-user',
  templateUrl: './content-user.component.html',
  styleUrls: ['./content-user.component.scss']
})
export class ContentUserComponent {

  constructor(private configService: ConfigService) {
    this.configService.activeSectionLayout(false);
  }

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  isSideNavCollapsed = false;

  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  getBodyclass(): string {
    let styleClass = '';

    if (this.isSideNavCollapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.isSideNavCollapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
