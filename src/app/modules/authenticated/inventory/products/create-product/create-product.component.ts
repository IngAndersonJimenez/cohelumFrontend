import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryService } from "../../../../../services/inventory.service";
import { LoginService } from "../../../../../services/login.service";
import { ResponseLogin } from "../../../../../interface/ResponseLogin";
import {Inventory} from "../../../../../interface/products/Inventory";

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
  onSubmit() {
    const formData = this.productForm.value;
    this.inventoryService.createProduct(formData).subscribe(
        result => {
          console.log('Product created successfully', result);
          // Puedes manejar la respuesta según tus necesidades
        },
        error => {
          console.error('Error creating product', error);
          // Puedes manejar el error según tus necesidades
        }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.productForm.patchValue({ image: file });
  }

  ngOnInit(): void {
    this.buildForm()
  }

}
