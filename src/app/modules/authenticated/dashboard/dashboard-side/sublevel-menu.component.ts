import {Component, Input, OnInit} from '@angular/core';
import { INavbarData, fadeInOut } from 'src/app/interface/side/helper';
import {animate, state, style, transition, trigger} from "@angular/animations";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sublevel-menu',
  template: `
    <ul *ngIf="collapsed && data.items && data.items.length>0"
        [@submenu]="expanded
            ? {value: 'visible', params: {transitionParams: '400ms cubic-bezier(0.86,0,0.07,1)',height:'*'}}
            :{value: 'hidden',
            params: {transitionParams: '400ms cubic-bezier(0.86,0,0.07,1)',height:'0'}}"
        class="sublevel-nav">
      <li *ngFor="let item of data.items" class="sublevel-nav-item">
        <a class="sublevel-nav-link"
           (click)="handleClick(item)"
           *ngIf="item.items && item.items.length>0"
           [ngClass]="getActiveClass(item)"
           >
          <i class="sublevel-link-icon fa fa-circle"></i>
          <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{item.label}}</span>
          <i *ngIf="item.items && collapsed" class="menu-collapse-icon"
             [ngClass]="!item.expanded ? 'fa fa-angle-right':'fa fa-angle-down'"
          >
          </i>
        </a>
        <a  class="sublevel-nav-link"
           *ngIf="!item.items || (item.items && item.items.length === 0)"
           [routerLink]="[item.routerLink]"
           routerLinkActive="active-sublevel"
        >
          <i class="sublevel-link-icon fa fa-circle"></i>
          <span class="sublevel-link-text" @fadeInOut *ngIf="collapsed">{{item.label}}</span>
        </a>
        <div *ngIf="item.items && item.items.length > 0">
          <app-sublevel-menu
            [collapsed]="collapsed"
            [multiple]="multiple"
            [expanded]="item.expanded"
          ></app-sublevel-menu>
        </div>
      </li>
    </ul>
  `,
  styleUrls: ['./dashboard-side.component.scss'],
  animations:[
    fadeInOut,
    trigger('submenu',[
      state('hidden',style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height:'*'
      })),
      transition('visible <=> hidden',[style({overflow: 'hidden'}),
      animate('{{transitionParams}}')]),
      transition('void => *', animate(0))
    ])
  ]
})
export class SublevelMenuComponent implements OnInit{
  constructor(public router: Router) {
  }

  @Input() data: INavbarData = {
    routerLink: '',
    icon: '',
    label:'',
    items:[]
  }
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple = false
  ngOnInit(): void {
  }

  handleClick(item:any){
    if (!this.multiple){
      if (this.data.items && this.data.items.length >0){
        for (let modelItem of this.data.items){
          if (item ! == modelItem && modelItem.expanded){
            modelItem.expanded = true;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item:INavbarData):string{
    return item.expanded && this.router.url.includes(item.routerLink) ? 'active-sublevel' : '';
  }

}