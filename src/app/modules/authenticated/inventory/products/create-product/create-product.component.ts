import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryService } from "../../../../../services/inventory.service";
import { LoginService } from "../../../../../services/login.service";
import {NotificationService} from "../../../../../notifications/notification.service";
import {InventoryCategory} from "../../../../../interface/products/inventoryCategory";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit{

  public productForm!: FormGroup;
  selectedPDFName: string | undefined;
  selectedImage: string | undefined;
  categories!: InventoryCategory[];
  constructor(private notificationService:NotificationService, private inventoryService: InventoryService, private formBuilder: FormBuilder, private loginService: LoginService) {}

  private buildForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      unitsAvailable: [null, Validators.required],
      categoryId: [null,Validators.required],
      characteristic: [''],
      datasheet: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('unitsAvailable', this.productForm.get('unitsAvailable')?.value);
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('characteristic', this.productForm.get('characteristic')?.value);
      formData.append('datasheet', this.productForm.get('datasheet')?.value);
      const isImageAttached = this.productForm.get('image')?.value !== null;
      if (isImageAttached) {
        formData.append('image', this.productForm.get('image')?.value);
      }

      this.inventoryService.createProduct(formData).subscribe(
          result => {
            this.productForm.reset();
            this.selectedImage = undefined;
            this.selectedPDFName = undefined;
            console.log('Producto creado correctamente', result);
          },
          error => {
            console.error('Error al crear el producto', error);
          }
      );
    } else {
      console.log('El formulario no está completo. No se llama al servicio.');
    }
  }


  onFileSelected(event: any, type: string): void {
    const input = event.target;
    const newFile = input.files ? input.files[0] : null;

    if (newFile) {
      const fileSizeInBytes = newFile.size;
      const maxSizeInBytes = 6 * 1024 * 1024;

      if (fileSizeInBytes > maxSizeInBytes) {
        console.error('El archivo excede el tamaño permitido (6 megabytes).');
        this.notificationService.showError("El archivo excede el tamaño permitido (6 megabytes).", "Vuelve a intentar");
        input.value = null;
        return;
      }

      if (type === 'image' && newFile !== this.productForm.get('image')?.value) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImage = e.target.result;
        };
        reader.readAsDataURL(newFile);

        const formData = new FormData();
        formData.append('image', newFile);
        this.productForm.patchValue({ image: formData.get('image') });
      }
    }

  }

  ngOnInit(): void {
    this.buildForm()
    this.inventoryService.getCategory().subscribe(
        (response: any) => {
          this.categories = response.responseDTO;
          console.log(this.categories);
        },
        error => {
          console.error('Error al obtener las categorías', error);
        }
    );
  }
  validateEnter(event: KeyboardEvent, tipo: string) {
    let pattern: RegExp = /[a-zA-Z]/;

    if (tipo === 'numeros') {
      pattern = /[0-9]/;
    }
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
