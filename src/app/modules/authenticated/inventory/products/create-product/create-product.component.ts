import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryService } from "../../../../../services/inventory.service";
import { LoginService } from "../../../../../services/login.service";
import { ResponseLogin } from "../../../../../interface/ResponseLogin";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit{

  imageUrl: string | undefined;
  public productForm!: FormGroup;
  public userCurrent!: ResponseLogin;
  selectedPDFName: string | undefined;
  selectedImage: string | undefined;

  constructor(private router: Router, private inventoryService: InventoryService, private formBuilder: FormBuilder, private loginService: LoginService) {}

  private buildForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      unitsAvailable: [null, Validators.required],
      description: ['',Validators.required],
      characteristic: [''],
      datasheet: ['', Validators.required],
      image: [null, Validators.required]
    });
  }
  onSubmit() {
    const formData = this.productForm.value;
    console.log('Tipo de inventory.image:', typeof formData.image);
    const isImageAttached = this.productForm.get('image')?.value !== null;

    if (isImageAttached) {
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
      console.log('No se seleccionó ninguna imagen. No se llama al servicio.');
    }
  }



  onFileSelected(event: any, type: string): void {
    const input = event.target;
    const newFile = input.files ? input.files[0] : null;

    if (type === 'image' && newFile !== this.productForm.get('image')?.value) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(newFile);
      const imageFile = new File([newFile], newFile.name);
      this.productForm.patchValue({ image: imageFile });
    }
  }

  ngOnInit(): void {
    this.buildForm()
  }

}
