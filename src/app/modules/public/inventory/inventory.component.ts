import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { InventoryGrid } from 'src/app/interface/inventory/InventoryGrid';
import { InventoryCategory } from 'src/app/interface/products/inventoryCategory';
import { InventoryService } from 'src/app/services/inventory.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from "@angular/router";
import { CommentService } from "../../../services/comment.service";
import { InventoryComments } from "../../../interface/comment/InventoryComments";
import { environment } from "../../../environments/environment";
import { CategoryService } from 'src/app/services/category.service';
import { SubCategory } from 'src/app/interface/products/SubCategory';
import { CategoryFull } from 'src/app/interface/CategoryFull';
import { Category } from 'src/app/interface/products/Category';

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
  comments: InventoryComments[] = [];
  pathImage: string = environment.sourceImage;
  isActiveSubCategories: Boolean = false;
  public inventorySubCategory: Array<SubCategory> = [];
  public categoryFull: Array<CategoryFull> = [];
  selectedCategory: Category | null = null;

  constructor(private inventoryService: InventoryService, private loginService: LoginService,
    private formBuilder: FormBuilder, private router: Router, private commentService: CommentService,
    private categoryService: CategoryService) {
    this.getTokenPublic();
  }

  ngOnInit() {
    this.optionOrder = [
      { name: 'Alfabeticamente', code: 1 },
      { name: 'Menor a mayor precio', code: 2 },
      { name: 'Mayor a menor precio', code: 3 }
    ];
    this.categoryService.selectedCategory$.subscribe((category) => {
      this.selectedCategory = category;

      this.filterInventory();
    });
  }

  filterInventory() {
    if (this.selectedCategory) {
      console.log('Esto es lo que llega a categoria: ', this.selectedCategory)
      const selectedCategoryId = this.selectedCategory.getIdCategory;
      this.inventoryFilter = this.inventoryGrid.filter(
          (inventory) => inventory.getIdCategory === selectedCategoryId

      );
      console.log('Esto es filtro: ', this.inventoryFilter)
    } else {
      this.inventoryFilter = this.inventoryGrid;
    }
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
            response.getInventorySubCategoryDTO.idSubCategory,
            response.getInventoryDTO.name,
            response.getInventoryDetailsDTO.characteristic,
            response.getInventoryDetailsDTO.datasheet,
            response.getInventoryDTO.idInventory);
          this.inventoryService.setImages(response.getInventoryDTO.idInventory, response.getInventoryImageDTO);
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
        inventoryGridInto.setImageInitial(this.pathImage + image.image);

      }

      if (count == 1) {
        inventoryGridInto.setImageSecond(this.pathImage + image.image);
      }

      count++;
    }
  }


  getCategoryAll(token: string) {
    let response: any;
    let listSubCategories: Array<SubCategory>;
    this.inventoryService.getCategory(token).subscribe(
      data => {
        response = data;
        this.inventoryCategories = response.responseDTO
        for (let iter of response.responseDTO) {
          this.categoryFull.push(new CategoryFull(
            new Category(iter.description, '', iter.idCategory),
            listSubCategories
          ));
        }


      }
    );
    this.getSubCategoryAll(token);
  }

  getSubCategoryAll(token: string) {
    let response: any;
    let listSubCategories: Array<SubCategory>;
    this.categoryService.getSubcategory(token).subscribe(data => {
      response = data;
      this.inventorySubCategory = response.responseDTO

      for (let category of this.categoryFull) {
        listSubCategories = [];
        for (let subCategory of response.responseDTO) {
          if (category.getCategory().getIdCategory() == subCategory.idCategory) {
            listSubCategories.push(
              new SubCategory(subCategory.idSubCategory, subCategory.description, subCategory.active, subCategory.idCategory))
          }
        }
        category.setListSubCategories(listSubCategories);
      }

    });
  }

  filterForSubCategory(idCategory: number, idSubCategory: number) {

    if (idCategory == 0 && idSubCategory == 0) {
      this.inventoryFilter = this.inventoryGrid;
    } else {
      this.inventoryFilter = [];
      for (let inventory of this.inventoryGrid) {
        if (inventory.getIdCategory() == idCategory && inventory.getIdSubCategory() == idSubCategory) {
          this.inventoryFilter.push(inventory);
        }
      }
    }
    this.isActiveSubCategories = true;
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
    console.log(index)
  }

  navigateToDetail(inventory: InventoryGrid) {
    const idCategory = inventory.getIdCategory();
    const name = inventory.getName();
    const characteristic = inventory.getCharacteristic();
    const datasheet = inventory.getDatasheet();
    const image = inventory.getImages()
    const price = inventory.getPrice()
    const idInventory = inventory.getIdInventory()

    this.inventoryService.setSelectedCategoryId(idCategory);
    this.inventoryService.setSelectedInventoryDetails({
      name: name,
      characteristic: characteristic,
      datasheet: datasheet,
      image: image,
      price: price,
      idInventory: idInventory
    });
    this.loginService.getTokenPublicS().subscribe(dataAuth => {
      this.commentService.getCommentById(idInventory, dataAuth.token).subscribe(
        (comment: any) => {
          this.comments = comment.responseDTO
          this.commentService.setComments(this.comments);
        }
      );
    });
    this.router.navigate(['/Detail']);
  }

}
