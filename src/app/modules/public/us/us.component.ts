import { AfterViewInit, Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-us',
  templateUrl: './us.component.html',
  styleUrls: ['./us.component.scss']
})
export class UsComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.scroller.scrollToPosition([0, 0]);
    this.scrollToSection('seccionNosotros', 80)
  }

  constructor(private scroller: ViewportScroller) {
  }

  scrollToSection(position: any, variable: number) {
    const sectionToScrollTo = document.getElementById(position);
    if (sectionToScrollTo) {

      console.log(sectionToScrollTo);
      console.log('sectionToScrollT.offsetTop');
      console.log(sectionToScrollTo.offsetTop);

      let yOffset = sectionToScrollTo.offsetTop;

      if (sectionToScrollTo.offsetTop > 536) {
        yOffset = (sectionToScrollTo.offsetTop - sectionToScrollTo.offsetTop) + 800;
      } else {
        yOffset = sectionToScrollTo.offsetTop - variable;
      }

      this.scroller.scrollToPosition([0, yOffset]);
      console.log('scrollToSection');
      console.warn('scrollToSection');
    } else {
      console.error('Elemento no encontrado');
    }
  }

}
