import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-header-public',
  templateUrl: './header-public.component.html',
  styleUrls: ['./header-public.component.scss']
})
export class HeaderPublicComponent {

  constructor(public router: Router, private scroller: ViewportScroller, private inventoryService:InventoryService) {
  }

  navegateLogin() {
    this.router.navigateByUrl('cohelum/login');
  }

  goTo(position: any) {
    this.scroller.scrollToAnchor(position);
    this.activateSectionInventory();
  }

  scrollToDiv(target:HTMLElement){
    console.log('conector')
    target.scrollIntoView();
  }

  activateSectionInventory() {
    console.log("Activando seccion");
    this.inventoryService.activeSectionInventoty(false);
  }

}
