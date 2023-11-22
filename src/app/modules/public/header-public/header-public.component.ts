import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-public',
  templateUrl: './header-public.component.html',
  styleUrls: ['./header-public.component.scss']
})
export class HeaderPublicComponent {

  constructor(public router: Router) { }

  navegateLogin() {
    this.router.navigateByUrl('cohelum/login');
  }

}
