import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
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
        // Cambiar al modo de edición para la categoría seleccionada
        category.editing = true;
    }

    saveEditedCategory(category: InventoryCategory) {
        // Aquí puedes agregar la lógica para guardar la categoría editada
        // Por ejemplo, llamar al servicio para actualizarla en la base de datos
        // Luego, recargar los datos y salir del modo de edición
        this.inventoryService.updateCategory(category).subscribe(
            (data: any) => {
                console.log(data);
                // Recargar los datos y salir del modo de edición
                this.loadData();
            }
        );
    }

    cancelEdit(category: InventoryCategory) {
        // Salir del modo de edición y cancelar los cambios
        category.editing = false;
    }

}
