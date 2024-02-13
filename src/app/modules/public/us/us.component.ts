import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-us',
  templateUrl: './us.component.html',
  styleUrls: ['./us.component.scss']
})
export class UsComponent implements OnInit {

  ngOnInit(): void {
    this.scroller.scrollToPosition([0, 0]);
    this.scrollToSection('usSection', 80)
  }

  constructor(private scroller: ViewportScroller) {
  }

  scrollToSection(position: any, variable: number) {
    const sectionToScrollTo = document.getElementById(position);
    if (sectionToScrollTo) {
      const yOffset = sectionToScrollTo.offsetTop - variable;
      this.scroller.scrollToPosition([0, yOffset]);
    } else {
      console.error('Elemento no encontrado');
    }
  }

}
