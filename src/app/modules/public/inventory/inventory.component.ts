import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InventoryGrid } from 'src/app/interface/inventory/InventoryGrid';
import { InventoryCategory } from 'src/app/interface/products/inventoryCategory';
import { InventoryService } from 'src/app/services/inventory.service';
import { LoginService } from 'src/app/services/login.service';
import {Router} from "@angular/router";
import {Product} from "../../../interface/products/Product";

interface OptionOrder {
  name: string;
  code: number;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  public inventoryGrid: Array<InventoryGrid> = [];
  optionOrder: OptionOrder[] | undefined;
  public inventoryCategories: Array<InventoryCategory> = [];
  public inventoryFilter: Array<InventoryGrid> = [];

  constructor(private inventoryService: InventoryService, private loginService: LoginService,
    private formBuilder: FormBuilder,private router:Router) {
    this.getTokenPublic();
  }

  ngOnInit() {
    this.optionOrder = [
      { name: 'Alfabeticamente', code: 1 },
      { name: 'Menor a mayor precio', code: 2 },
      { name: 'Mayor a menor precio', code: 3 }
    ];
  }

  private getTokenPublic() {
    this.loginService.getTokenPublicS().subscribe(data => {
      this.getInventoryAll(data.token);
      this.getCategoryAll(data.token);
    }
    );
  }

  private getInventoryAll(token: string) {

    let inventoryGridInto: InventoryGrid;

    this.inventoryService.getInventoryAll(token).subscribe(
      data => {

        for (let response of data.responseDTO) {

          inventoryGridInto = new InventoryGrid(response.getInventoryCategoryDTO.description,
            response.getInventoryDTO.name,
            response.getInventoryDTO.price, response.getInventoryDTO.unitsAvailable,
            "", "", response.getInventoryImageDTO,
              response.getInventoryCategoryDTO.idCategory,
              response.getInventoryDTO.name,
              response.getInventoryDetailsDTO.characteristic,
              response.getInventoryDetailsDTO.datasheet);

          this.setImages(response.getInventoryImageDTO, inventoryGridInto);
          this.inventoryGrid.push(inventoryGridInto);
        }
      }
    );
    this.inventoryFilter = this.inventoryGrid;

  }

  private setImages(images: any[], inventoryGridInto: InventoryGrid) {
    let count: number = 0;


    for (let image of images) {

      if (count == 0) {
        inventoryGridInto.setImageInitial('data:image/png;base64,' + image.image);
      }

      if (count == 1) {
        inventoryGridInto.setImageSecond('data:image/png;base64,' + image.image);
      }

      count++;
    }
  }


  getCategoryAll(token: string) {
    let response: any;
    this.inventoryService.getCategory(token).subscribe(
      data => {
        response = data;
        this.inventoryCategories = response.responseDTO
      }
    );
  }

  filterForCategory(descriptionCategory: string) {

    if (descriptionCategory === 'todos') {
      this.inventoryFilter = this.inventoryGrid;
    } else {
      this.inventoryFilter = [];
      for (let inventory of this.inventoryGrid) {
        if (inventory.getDescriptionCategory() === descriptionCategory) {
          this.inventoryFilter.push(inventory);
        }
      }
    }
  }


  orderInventory(code: any) {

    if (code.target.value == 1) {
      this.inventoryFilter.sort(
        (a, b) => a.getDescriptionInventory().localeCompare(b.getDescriptionInventory())
      );
    }

    if (code.target.value == 2) {
      this.inventoryFilter.sort(
        (a, b) => a.getPrice() - b.getPrice());
    }

    if (code.target.value == 3) {
      this.inventoryFilter.sort(
        (a, b) => b.getPrice() - a.getPrice());
    }

  }

  selectedProduct(index: number) {
    console.log("Producto seleccionado")
    console.log(index)
  }

  navigateToDetail(inventory: InventoryGrid) {
    const idCategory = inventory.getIdCategory();
    const name = inventory.getName();
    const characteristic = inventory.getCharacteristic();
    const datasheet = inventory.getDatasheet();
    const image = inventory.getImages()
    const price = inventory.getPrice()

    this.inventoryService.setSelectedCategoryId(idCategory);
    this.inventoryService.setSelectedInventoryDetails({
      name: name,
      characteristic: characteristic,
      datasheet: datasheet,
      image:image,
      price:price
    });

    this.router.navigate(['/Detail']);
  }

}
