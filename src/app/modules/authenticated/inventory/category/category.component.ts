import {Component, ViewChild} from '@angular/core';
import {Category} from "../../../../interface/Category";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],

})
export class CategoryComponent {


  Listado: Category[] = [
    {position: 1, description:'Hydrogen', status: 'activo'},
    {position: 2, description:'Helium',   status: 'desactivado'},
    {position: 3, description:'Oxygen',   status: 'activo'},
    {position: 4, description:'Carbon',   status: 'activo'},
    {position: 5, description:'Nitrogen', status: 'desactivado'},
    {position: 6, description:'Neon',     status: 'activo'},
    {position: 7, description:'Argon',    status: 'desactivado'},
    {position: 8, description:'Krypton',  status: 'activo'},
    {position: 9, description:'Xenon',    status: 'activo'},
    {position: 10,description: 'Radon',   status: 'desactivado'},
    {position: 11,description: 'Fluorine',status: 'activo'},
    {position: 12,description: 'Chlorine',status: 'activo'},
    {position: 13,description: 'Bromine', status: 'desactivado'},
    {position: 14,description: 'Iodine',  status: 'activo'},
    {position: 15,description: 'Astatine',status: 'activo'},
  ];

  displayedColumns: string[] = ['position', 'description','status','action'];
  dataSource = new MatTableDataSource(this.Listado);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isEditMode = false;
  editedRowIndex = -1;
    editedRow: Category = { position: 0, description: '', status: '' };

}
