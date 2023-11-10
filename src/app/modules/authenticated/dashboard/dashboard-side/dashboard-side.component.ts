import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { INavbarData, fadeInOut } from 'src/app/interface/side/helper';
import { navbarData } from 'src/app/interface/side/nav-data';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-dashboard-side',
  templateUrl: './dashboard-side.component.html',
  styleUrls: ['./dashboard-side.component.scss'],
  animations:[
    fadeInOut,
    trigger('rotate',[
      transition(':enter',[
        animate('1000ms',
          keyframes([
            style({transform:'rotate(0deg)',offset:'0'}),
            style({transform:'rotate(2turn)',offset:'1'})
          ])
        )
        ])
      ])
  ]
})
export class DashboardSideComponent  implements OnInit{

  constructor(public router: Router) {
  }

  @Output() onToggleSideNav : EventEmitter<SideNavToggle> = new EventEmitter()
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple:boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event:any){
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth:this.screenWidth})
    }
  }
  toggleCollapsed(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth:this.screenWidth})
  }
  closeSidenav(){
    this.collapsed = false
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth:this.screenWidth})
  }

  ngOnInit(): void {
    this.screenWidth =window.innerWidth
  }
  handleClick(item: INavbarData){
    if (!this.multiple){
      for (let modelItem of this.navData){
        if (item !== modelItem && modelItem.expanded){
          modelItem.expanded = false;
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(data: INavbarData):string{
    return this.router.url.includes(data.routerLink) ? 'active': ''
  }


}
