import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { InventoryService } from "../../../../../services/inventory.service";
import { Product } from "../../../../../interface/products/Product";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {InventoryImage} from "../../../../../interface/InventoryImage";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../../../../notifications/notification.service";

@Component({
  selector: 'app-consult-product',
  templateUrl: './consult-product.component.html',
  styleUrls: ['./consult-product.component.scss']
})
export class ConsultProductComponent implements OnInit {

  consultaForm: FormGroup;
  productData: Product | undefined;
  pdfSrc: SafeResourceUrl = '';
  listImage: string[] = [];
  responsiveOptions: any[] | undefined;
  productId :  number | undefined;
  currentImage: string | undefined;
  selectedFile: string | undefined;
  imageSelected: boolean = false;
  showImagePreview: boolean = false;



  constructor(private fb: FormBuilder, private inventoryService: InventoryService,private sanitizer: DomSanitizer,private notificationService:NotificationService ) {
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
            this.productId = data.responseDTO.getInventoryDTO.idInventory
            this.imageSelected = false;
            console.log('Esto es la data: ',data)
            const imageListOrObject = this.productData?.responseDTO.getInventoryImageDTO;

            if (Array.isArray(imageListOrObject) && imageListOrObject.length > 0) {
              this.listImage = imageListOrObject.map(image => 'data:image/png;base64,' + image.image);
            } else if (!Array.isArray(imageListOrObject) && imageListOrObject?.image) {
              this.listImage = ['data:image/png;base64,' + imageListOrObject.image];
            }

            if (this.productData.responseDTO.getInventoryDetailsDTO.datasheet) {
              this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64, ${this.productData.responseDTO.getInventoryDetailsDTO.datasheet}`);
            }

          },
          (error) => {
            console.error('Error al buscar el producto', error);
          }
      );
    }
  }

  toggleProductStatus() {
    if (this.productData?.responseDTO) {
      this.productData.responseDTO.getInventoryDTO.active = !this.productData.responseDTO.getInventoryDTO.active;
    }
  }

  addImage(): void {
    if (this.productId && this.selectedFile) {
      this.inventoryService.createImageProduct(this.productId, this.selectedFile).subscribe(
          (data: InventoryImage) => {
            this.imageSelected=true;
            console.log('Imagen creada exitosamente', data);
            this.searchProduct()
          },
          (error) => {
            console.error('Error al crear la imagen del producto', error);
          }
      );
    }
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageSrc = e.target.result as string;
        this.openImagePreview(imageSrc);
      };
      reader.readAsDataURL(this.selectedFile as any);
    }
  }

  acceptImage(): void {
    this.addImage();
    this.closeImagePreview()
  }


  openImagePreview(imageSrc: string): void {
    this.currentImage = imageSrc;
    this.showImagePreview = true;
    console.log('showImagePreview', this.showImagePreview);
  }


  closeImagePreview(): void {
    this.showImagePreview = false;
  }



}
