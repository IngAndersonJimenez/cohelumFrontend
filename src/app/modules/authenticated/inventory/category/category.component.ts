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

  constructor(private inventoryService:InventoryService) {

  }

  listCategory!: InventoryCategory[];
  displayedColumns: string[] = ['idCategory', 'description','active','action'];
  dataSource = new MatTableDataSource<InventoryCategory>(this.listCategory);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  ngOnInit(): void {
      this.loadData()
  }

  loadData() {

      this.inventoryService.getCategory().subscribe(
          (data: any) => {
              console.log(data);
              this.listCategory = data.responseDTO;
              this.dataSource = new MatTableDataSource<InventoryCategory>(this.listCategory);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
          }
      );
  }
}
