import { Component, Input } from '@angular/core';


interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-content-user',
  templateUrl: './content-user.component.html',
  styleUrls: ['./content-user.component.scss']
})
export class ContentUserComponent {

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data:SideNavToggle){
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

}
