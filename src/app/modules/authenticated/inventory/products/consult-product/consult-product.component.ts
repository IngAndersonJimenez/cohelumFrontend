import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-consult-product',
  templateUrl: './consult-product.component.html',
  styleUrls: ['./consult-product.component.scss']
})
export class ConsultProductComponent {

  nombre: string = 'John Doe';
  email: string = 'john@example.com';
  products: any[] = [];
  consultaForm: FormGroup;
  canShowSearchAsOverlay = false;
  constructor(private fb: FormBuilder) {
    this.consultaForm = this.fb.group({
      name:[''],
      price: [''],
      unitsAvailable: [''],
      description: [''],
      characteristic: [''],
      datasheet: [''],
      image: ['']
    });
  }




}
