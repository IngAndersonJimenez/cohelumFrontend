import { Component, OnInit} from '@angular/core';
import {ProductFull} from "../../../../../interface/products/ProductFull";
import {InventoryService} from "../../../../../services/inventory.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NotificationService} from "../../../../../notifications/notification.service";
import {DomSanitizer} from "@angular/platform-browser";
import {InventoryImage} from "../../../../../interface/InventoryImage";
import {InventoryCategory} from "../../../../../interface/products/inventoryCategory";




@Component({
  selector: 'app-consult-product',
  templateUrl: './consult-product.component.html',
  styleUrls: ['./consult-product.component.scss']
})
export class ConsultProductComponent implements OnInit {

  products:ProductFull[] = [];
  imageList:string[]=[];
  consultForm: FormGroup;
  updateForm:FormGroup;
  responsiveOptions: any[] | undefined;
  selectedFile: string | undefined;
  currentImage: string | undefined;
  showImagePreview: boolean = false;
  categories!:InventoryCategory[];
  showUpdateDialog = false;
  loadingCategories: boolean = false;
  showUpdateImageDialog:boolean = false;

  constructor(private fb: FormBuilder, private inventoryService: InventoryService,private sanitizer: DomSanitizer,private notificationService:NotificationService) {
    this.consultForm = this.fb.group({
      name: [''],
      price: [''],
      unitsAvailable: [''],
      description: [''],
      characteristic: [''],
      datasheet: [''],
      image: ['']
    });
    this.updateForm = this.fb.group({
      name: [''],
      price: [''],
      unitsAvailable: [''],
      idCategory: [null],
      characteristic: [''],
      datasheet: [''],
      image: [''],
      idInventoryImage:[]
    });

  }

  loadProducts(product: ProductFull){

    const productName = product.name;
    if (productName && productName.trim() !== '') {
      this.products = [];

      this.inventoryService.getInventoryByName(productName).subscribe(
          (data: any) => {
            const responseDTO = data.responseDTO;

            if (responseDTO) {
              const product = new ProductFull(
                  responseDTO.getInventoryDTO.idInventory,
                  responseDTO.getInventoryDTO.name,
                  responseDTO.getInventoryDTO.price,
                  responseDTO.getInventoryDTO.unitsAvailable,
                  responseDTO.getInventoryDTO.active,
                  responseDTO.getInventoryDetailsDTO.characteristic,
                  this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + (responseDTO.getInventoryDetailsDTO.datasheet || '')),
                  responseDTO.getInventoryCategoryDTO.idCategory,
                  responseDTO.getInventoryCategoryDTO.description,
                  responseDTO.getInventoryImageDTO[0].idInventoryImage,
                  'data:image/png;base64,' + responseDTO.getInventoryImageDTO[0].image
              );

              this.products.push(product);

              this.imageList = responseDTO.getInventoryImageDTO.map((imageDTO: any) => {
                return 'data:image/png;base64,' + imageDTO.image;
              });

            }

          }
      );
    }
  }
  ngOnInit(): void {
    this.consultForm.get('name')?.valueChanges.subscribe(() => {
      this.products = [];
    });
  }

  addImage(): void {
    if (this.products[0].idInventory && this.selectedFile) {

      this.inventoryService.createImageProduct(this.products[0].idInventory, this.selectedFile).subscribe(
          (data: InventoryImage) => {
            console.log('Imagen creada exitosamente', data);
            this.notificationService.showSuccess("Imagen Añadida al producto","Correctamente")
            this.loadProducts(this.products[0])
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

  onFileSelected1(event: any): void {
    this.selectedFile = event.target.files[0];
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

  closeUpdateDialog() {
    this.showUpdateDialog = false;
  }

  updateProduct(formdata:FormData){
    this.inventoryService.updateProduct(formdata,this.products[0].idInventory).subscribe(
        (data) =>{
          const updatedProductName = this.consultForm.get('name')?.value;
          this.closeUpdateDialog()
          this.loadProducts(updatedProductName)
        }
    )
  }

  openUpdateDialog(product: ProductFull): void {
    console.log('datasheet:' , product.datasheet)

    this.updateForm.setValue({
      name: product.name,
      price: product.price,
      unitsAvailable: product.unitsAvailable,
      idCategory: product.idCategory,
      characteristic: product.characteristic,
      datasheet: product.datasheet,
      image:'',
      idInventoryImage:''
    });

    this.inventoryService.getCategory().subscribe(
        (response: any) => {
          this.categories = response.responseDTO;
          this.showUpdateDialog = true;
          this.loadingCategories = false;
        }
    );
  }

  openUpdateDialog2(product: ProductFull): void {
    console.log('datos: ', product.idInventoryImage);
    this.updateForm.patchValue({
      image: product.image,
      idInventoryImage: product.idInventoryImage,
    });
    this.showUpdateImageDialog = true;
  }


  updateImage() {
    const formData = new FormData();
    formData.append('image', this.updateForm.get('image')?.value);

    const idInventoryImage = this.updateForm.get('idInventoryImage')?.value;

    this.inventoryService.updateImageProduct(formData, idInventoryImage).subscribe(
        (updatedProduct: ProductFull) => {
          console.log('Imagen actualizada exitosamente', updatedProduct);
          this.closeUpdateImageDialog();
        }
    );
  }



  closeUpdateImageDialog(){
    this.showUpdateImageDialog = false;
  }

  loadImage(image:any){
    this.selectedFile = image.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
      };
      reader.readAsDataURL(this.selectedFile as any);
      console.log('imagen: ',this.selectedFile)
      this.updateForm.get('image')?.setValue(this.selectedFile)
      console.log('imagen: ',this.updateForm)

    }
  }



}
