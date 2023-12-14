import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubCategory } from "../../../../../interface/products/SubCategory";
import { NotificationService } from "../../../../../notifications/notification.service";
import { CategoryService } from "../../../../../services/category.service";
import { InventoryCategory } from "../../../../../interface/products/inventoryCategory";
import { InventoryService } from "../../../../../services/inventory.service";


@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent {

  subCategoryList: SubCategory[] = [];
  displayedColumns: string[] = ['idSubCategory', 'description', 'idCategory', 'active', 'action'];
  dataSource = new MatTableDataSource<SubCategory>(this.subCategoryList);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public productForm!: FormGroup;
  showDialog: boolean = false;
  categories!: InventoryCategory[];

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder, private notificationService: NotificationService, private inventoryService: InventoryService) {
  }

  private buildForm() {
    this.productForm = this.formBuilder.group({
      description: ['', Validators.required],
      idCategory: [null, Validators.required]
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refreshTable() {
    this.dataSource = new MatTableDataSource<SubCategory>(this.subCategoryList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getSubcategory() {
    this.subCategoryList = [];
    this.categoryService.getSubcategory().subscribe(
      (data: any) => {
        for (let iterDate of data.responseDTO) {
          const subCategoryProduct = new SubCategory(
            iterDate.idSubCategory,
            iterDate.description,
            iterDate.active,
            iterDate.idCategory
          );

          this.subCategoryList.push(subCategoryProduct);

        }
        this.refreshTable();
      }
    );
  }

  ngOnInit(): void {
    this.getSubcategory();
    this.buildForm();

  }

  editCategory(subcategory: SubCategory) {
    subcategory.isEditing = true;
    this.inventoryService.getCategory().subscribe(
      (response: any) => {
        this.categories = response.responseDTO;
      }
    );
  }


  cancelEdit(subCategory: SubCategory) {
    subCategory.isEditing = false;
  }

  openAddDialog() {

    this.inventoryService.getCategory().subscribe(
      (response: any) => {
        this.categories = response.responseDTO;
        this.showDialog = true;
      }
    );
  }

  closeDialog() {
    this.showDialog = false;
  }

  addSubCategory(subcategory: SubCategory) {
    this.categoryService.createInventorySubCategory(subcategory).subscribe(
      (data: any) => {
        this.notificationService.showSuccess("Registro Exitoso!", "La subcategoría se ha creado correctamente!");
        this.getSubcategory()
        this.productForm.reset()
      }
    )
    this.closeDialog();
  }



  updateSubcategory(subcategory: SubCategory) {
    this.categoryService.updateInventorySubCategory(subcategory.getIdSubCategory(), subcategory.getActive(), 
      subcategory.getDescription(), subcategory.getIdCategory()).subscribe(
      (data: any) => {
        if (data != null && data.responseDTO && 'active' in data.responseDTO) {
          console.log('data', data)
          this.notificationService.showSuccess("Actualización Exitoso!", "La subcategoría se ha actualizado correctamente!");
          subcategory.isEditing = false;
          this.getSubcategory()

        }
      }
    )
  }
}
