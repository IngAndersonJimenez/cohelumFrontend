import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-consult-product',
  templateUrl: './consult-product.component.html',
  styleUrls: ['./consult-product.component.scss']
})
export class ConsultProductComponent {

  products: any[] = [];
  consultaForm: FormGroup;
  resultConsult: any; // Aquí almacenarás la información consultada
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

  onSubmit() {
    // Simulando una consulta a un servicio o API
    // En la práctica, puedes llamar a un servicio para obtener los datos reales
    const formData = this.consultaForm.value;
    // Aquí podrías llamar a un servicio que devuelva la información basada en la consulta
    this.resultConsult = {
      nombre: formData.nombre,
      // Otros campos...
    };
  }


}
