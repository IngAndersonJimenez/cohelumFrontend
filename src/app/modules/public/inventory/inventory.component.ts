import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InventoryGrid } from 'src/app/interface/inventory/InventoryGrid';
import { InventoryCategory } from 'src/app/interface/products/inventoryCategory';
import { InventoryService } from 'src/app/services/inventory.service';
import { LoginService } from 'src/app/services/login.service';

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
    private formBuilder: FormBuilder) {
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
        console.log("Consulta inventario")
        console.log(data)

        for (let response of data.responseDTO) {
          console.log(response.getInventoryCategoryDTO.description)

          inventoryGridInto = new InventoryGrid(response.getInventoryCategoryDTO.description,
            response.getInventoryDTO.name,
            response.getInventoryDTO.price, response.getInventoryDTO.unitsAvailable,
            "", "")

          this.setImages(response.getInventoryImageDTO, inventoryGridInto);
          this.inventoryGrid.push(inventoryGridInto);
        }
      }
    );

    console.log("Consulta resultado")
    console.log(this.inventoryGrid)
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

    if (descriptionCategory == 'todos') {
      this.inventoryFilter = this.inventoryGrid;
    } else {
      this.inventoryFilter = [];
      for (let inventory of this.inventoryGrid) {
        if (inventory.getDescriptionCategory() == descriptionCategory) {
          this.inventoryFilter.push(inventory);
          break;
        }
      }
    }
  }


}
