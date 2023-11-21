import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { InventoryService } from "../../../../../services/inventory.service";
import { Product } from "../../../../../interface/products/Product";

@Component({
  selector: 'app-consult-product',
  templateUrl: './consult-product.component.html',
  styleUrls: ['./consult-product.component.scss']
})
export class ConsultProductComponent implements OnInit {

  consultaForm: FormGroup;
  canShowSearchAsOverlay = false;
  productData: Product | undefined;
  pdfSrc: string = '';

  constructor(private fb: FormBuilder, private inventoryService: InventoryService) {
    this.consultaForm = this.fb.group({
      name: [''],
      price: [''],
      unitsAvailable: [''],
      description: [''],
      characteristic: [''],
      datasheet: [''],
      image: ['']
    });
  }

  ngOnInit(): void {
    this.consultaForm.get('name')?.valueChanges.subscribe(() => {
      this.productData = undefined;
      this.pdfSrc = '';
    });
  }

  // Método para realizar la búsqueda al hacer clic en el botón "Buscar"
  searchProduct(): void {
    const nombreProducto = this.consultaForm.get('name')?.value;

    if (nombreProducto && nombreProducto.trim() !== '') {
      // Realizar la búsqueda solo si hay un nombre de producto
      this.inventoryService.getInventoryByName(nombreProducto).subscribe(
          (respuesta: Product) => {
            if (respuesta && respuesta.responseDTO) {
              // Asignar otros datos según sea necesario
              this.productData = respuesta;

              // Verificar que hay una ficha técnica y tiene datos antes de asignar a pdfSrc
              if (respuesta.responseDTO.getInventoryDetailsDTO.datasheet) {
                const base64Data = respuesta.responseDTO.getInventoryDetailsDTO.datasheet;
                this.pdfSrc = `data:application/pdf;base64, ${base64Data}`;
              }
            } else {
              console.error('Respuesta inesperada del servidor:', respuesta);
              // Manejar errores si es necesario
            }
          }
      );
    } else {
      // Limpiar datos si el campo de búsqueda está vacío
      this.productData = undefined;
      this.pdfSrc = '';
    }
  }
}
