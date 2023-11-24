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
  imageR:string='';

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

  searchProduct(): void {
    const nombreProducto = this.consultaForm.get('name')?.value;

    if (nombreProducto && nombreProducto.trim() !== '') {
      this.inventoryService.getInventoryByName(nombreProducto).subscribe(
          (data: Product) => {
            this.productData = data;
            const imageListOrObject = this.productData?.responseDTO.getInventoryImageDTO;

            if (Array.isArray(imageListOrObject) && imageListOrObject.length > 0) {
              const firstImage = imageListOrObject[0];
              if (firstImage?.image) {
                this.imageR = 'data:image/png;base64,' + firstImage.image;
              }
            } else if (!Array.isArray(imageListOrObject) && imageListOrObject?.image) {
              this.imageR = 'data:image/png;base64,' + imageListOrObject.image;
            }

            if (this.productData.responseDTO.getInventoryDetailsDTO.datasheet) {
              const base64Data = this.productData.responseDTO.getInventoryDetailsDTO.datasheet;
              this.pdfSrc = `data:application/pdf;base64, ${base64Data}`;
            }

          },
          (error) => {
            console.error('Error al buscar el producto', error);
          }
      );
    }
  }





}
