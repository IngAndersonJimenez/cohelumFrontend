import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { InventoryService } from "../../../../../services/inventory.service";
import { NotificationService } from "../../../../../notifications/notification.service";
import { InventoryCategory } from "../../../../../interface/products/inventoryCategory";
import { SubCategory } from "../../../../../interface/products/SubCategory";
import { CategoryService } from "../../../../../services/category.service";
import {SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  public productForm!: FormGroup;
  selectedPDFName: string | undefined;
  selectedImage: string | undefined;
  categories!: InventoryCategory[];
  isLoading = false;
  subcategories: Array<SubCategory> = [];
  isActiveSubcategories: boolean = false;
  subcategoriesFilter: Array<SubCategory> = [];
  @ViewChild('fileInput') fileInput!: ElementRef;
  uploadedImages: any[] = [];
  isTextVisible = true;
  showProgressBar = false;
  uploadProgress = 0;
  pdfUrl!: SafeResourceUrl;



  constructor(private notificationService: NotificationService, private inventoryService: InventoryService, private formBuilder: FormBuilder,
     private categoryService: CategoryService) {
  }

  private buildForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      unitsAvailable: [null, Validators.required],
      categoryId: [null, Validators.required],
      idSubCategory: [null, Validators.required],
      characteristic: [''],
      datasheet: ['', Validators.required],
      image: [null, Validators.required]
    });
  }


  onSubmit() {
    this.isLoading = true;

    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('unitsAvailable', this.productForm.get('unitsAvailable')?.value);
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('idSubCategory', this.productForm.get('idSubCategory')?.value);
      formData.append('characteristic', this.productForm.get('characteristic')?.value);
      formData.append('datasheet', this.productForm.get('datasheet')?.value);

      this.uploadedImages.forEach((image, index) => {
        formData.append(`image[${index}]`, image.file);
      });

      this.inventoryService.createProduct(formData).subscribe(
          result => {
            this.isLoading = false;
            this.productForm.reset();
            this.selectedImage = undefined;
            this.selectedPDFName = undefined;
            this.uploadedImages = [];
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
        this.notificationService.showError("El archivo excede el tamaño permitido (6 megabytes).", "Vuelve a intentar");
        input.value = null;
        return;
      }

      const allowedImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const allowedPDFExtensions = ['pdf'];

      const fileExtension = newFile.name.split('.').pop().toLowerCase();

      if ((type === 'image' && !allowedImageExtensions.includes(fileExtension)) ||
          (type === 'pdf' && !allowedPDFExtensions.includes(fileExtension))) {
        this.notificationService.showError(`Solo se permiten archivos de ${type === 'image' ? 'imagen' : 'PDF'}.`, "Vuelve a intentar");
        input.value = null;
        return;
      }

      if (type === 'image') {
        this.showProgressBar = true;
        this.uploadProgress = 0;
        this.uploadedImages.push({
          file: newFile,
          dataURL: URL.createObjectURL(newFile),
        });

        this.isTextVisible = false;

        const interval = setInterval(() => {
          if (this.uploadProgress < 100) {
            this.uploadProgress += 10;
          } else {
            clearInterval(interval);
            this.showProgressBar = false;
          }
        }, 35);

      } else if (type === 'pdf' && newFile !== this.productForm.get('datasheet')?.value) {
        this.selectedPDFName = newFile.name;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.pdfUrl = e.target.result;
        };
        reader.readAsDataURL(newFile);

        const formData = new FormData();
        formData.append('datasheet', newFile);

        this.productForm.patchValue({ datasheet: formData.get('datasheet') });
      }
    }
  }



  ngOnInit(): void {
    this.buildForm()
    this.inventoryService.getCategory().subscribe(
      (response: any) => {
        this.categories = response.responseDTO;
      }
    );
    this.categoryService.getSubcategory().subscribe(
      (response: any) => {
        for (let iter of response.responseDTO) {
          this.subcategories.push(
            new SubCategory(iter.idSubCategory, iter.description, iter.active, iter.idCategory)
          );
        }
      },
    )

  }
  validateEnter(event: KeyboardEvent, tipo: string) {
    let pattern: RegExp;

    if (tipo === 'numeros') {
      pattern = /[0-9]/;
    } else {
      // Permitir letras y espacios
      pattern = /[a-zA-Z\s]/;
    }

    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  subCategoryLoad(idCategory: number) {
    this.isActiveSubcategories = true;
    this.subcategoriesFilter = [];
    for (let iter of this.subcategories) {
      if (iter.getIdCategory() == idCategory) {
        this.subcategoriesFilter.push(iter);
      }
    }
  }
  triggerFileInputClick() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  removeImage(index: number, event: Event) {
    event.stopPropagation();
    this.uploadedImages.splice(index, 1);
    this.showProgressBar = this.uploadedImages.length > 0;
    this.uploadProgress = 0;
    this.isTextVisible = this.uploadedImages.length === 0;
    this.showProgressBar = false;
  }

}
