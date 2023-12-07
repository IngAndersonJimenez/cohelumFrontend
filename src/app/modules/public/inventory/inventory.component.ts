import { Component } from '@angular/core';
import { InventoryGrid } from 'src/app/interface/inventory/InventoryGrid';
import { InventoryService } from 'src/app/services/inventory.service';
import { LoginService } from 'src/app/services/login.service';

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {

  layout: string = 'list';

  products: Product[] = [];

  public inventoryGrid: Array<InventoryGrid> = [];

  constructor(private inventoryService: InventoryService, private loginService: LoginService) {
    this.getTokenPublic();
    this.products.push({
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    })

    this.products.push({
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    })

    this.products.push({
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    })

    this.products.push({
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    })

    this.products.push({
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    })

    this.products.push({
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    })

  }

  private getTokenPublic() {
    this.loginService.getTokenPublicS().subscribe(data => {
      this.getInventoryAll(data.token);
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
            response.getInventoryDTO.description,
            response.getInventoryDTO.price, response.getInventoryDTO.unitsAvailable,
            "", "")

          this.setImages(response.getInventoryImageDTO, inventoryGridInto);
          this.inventoryGrid.push(inventoryGridInto);
        }
      }
    );

    console.log("Consulta resultado")
    console.log(this.inventoryGrid)


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


}
