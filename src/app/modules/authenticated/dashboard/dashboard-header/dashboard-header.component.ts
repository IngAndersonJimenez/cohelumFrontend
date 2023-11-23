import { Component, HostListener, Input, OnInit } from '@angular/core';
import { notifications, userItems } from 'src/app/interface/header-dummy-data';
import {Router} from "@angular/router";

interface RouteMapping {
  [key: string]: string;
}
@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  canShowSearchAsOverlay = false;
  notifications = notifications;
  userItems = userItems;
  constructor(private router:Router) {
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverlay(window.innerWidth)
  }
  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen';
    }
    return styleClass;
  }

  checkCanShowSearchAsOverlay(innverWidth: number) {
    if (innverWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
      this.canShowSearchAsOverlay = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth)
  }

  navigateTo(route: string) {
    const routeMapping: RouteMapping = {
      'Profile': '/profile',
      'Settings': '/settings',
      'Lock screen': '/lock-screen',
      'Logout': '/home'
    };

    const targetRoute = routeMapping[route];

    if (targetRoute) {
      this.router.navigate([targetRoute]);
    } else {
      console.error(`No se encontró una ruta para ${route}`);
    }
  }

}
