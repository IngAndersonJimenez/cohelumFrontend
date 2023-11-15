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

  constructor(private router: Router, private inventoryService: InventoryService, private formBuilder: FormBuilder, private loginService: LoginService) {}

  private buildForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      unitsAvailable: [null, Validators.required],
      characteristic: [''],
      datasheet: [''],
      image: [null, Validators.required]
    });
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const userCurrent = this.loginService.userCurrent;

      if (userCurrent) {
        const formData = this.productForm.value;

        console.log("Form Data:", this.productForm.value);
        console.log("Image Data:", formData.image);

        this.inventoryService.createProduct(formData).subscribe(
            result => {
              console.log("Producto creado exitosamente", result);
            },
            error => {
              console.error("Error al crear el producto", error);
            }
        );
      } else {
        console.error("Usuario actual no disponible");
      }
    }
  }

  ngOnInit(): void {
    this.buildForm()
  }

}
