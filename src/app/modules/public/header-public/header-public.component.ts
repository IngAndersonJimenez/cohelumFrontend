import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-header-public',
  templateUrl: './header-public.component.html',
  styleUrls: ['./header-public.component.scss']
})
export class HeaderPublicComponent {

  constructor(public router: Router, private scroller: ViewportScroller) {
  }

  navegateLogin() {
    this.router.navigateByUrl('cohelum/login');
  }

  goTo(position: any) {
    this.scroller.scrollToAnchor(position);
  }

  scrollToDiv(target:HTMLElement){
    console.log('conector')
    target.scrollIntoView();
  }


}
