import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {InventoryService} from "../../../../services/inventory.service";
import {InventoryCategory} from "../../../../interface/products/inventoryCategory";
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],

})
export class CategoryComponent implements OnInit{

    addingCategory = false;
    listCategory!: InventoryCategory[];
    displayedColumns: string[] = ['idCategory', 'description','active','action'];
    dataSource = new MatTableDataSource<InventoryCategory>(this.listCategory);
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private inventoryService:InventoryService) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    newCategory: InventoryCategory = {
        idCategory: 0,
        description: '',
        active: true
    };

  ngOnInit(): void {
      this.loadData()
  }

    loadData() {
        this.inventoryService.getCategory().subscribe(
            (data: any) => {
                console.log(data);
                this.listCategory = data.responseDTO;
                this.refreshTable();
            }
        );
    }
    refreshTable() {
        this.dataSource = new MatTableDataSource<InventoryCategory>(this.listCategory);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    addCategory() {
        this.addingCategory = true;
    }

    cancelAdd() {
        this.addingCategory = false;
        this.newCategory = { idCategory: 0, description: '', active: true };
    }
    saveCategory() {
        this.inventoryService.createCategory(this.newCategory).subscribe(
            (data: any) => {
                console.log(data);
                this.loadData();
                this.addingCategory = false;
                this.newCategory = { idCategory: 0, description: '', active: true };
            }
        );
    }



    editCategory(category: InventoryCategory) {
        category.editing = true;
        category.originalActive = true;
    }

    saveEditedCategory(category: InventoryCategory) {
        console.log('Datos antes de la actualización:', category);

        this.inventoryService.updateCategory(category).subscribe(
            () => {
                console.log('La categoría se actualizó correctamente.');
                this.loadData();
                category.editing = false;
            },
            error => {
                console.error('Error al actualizar la categoría:', error);
            }
        );
    }

    cancelEdit(category: InventoryCategory) {
        category.editing = false;
    }


}
