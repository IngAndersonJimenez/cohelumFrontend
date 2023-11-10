import {Component, ViewChild} from '@angular/core';
import {Inventory} from "../../../../interface/Inventory";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],

})
export class CategoryComponent {


  Listado: Inventory[] = [
    {position: 1, name: 'Hydrogen', price: 5000, unitsAvailable: 500, status: 'activo'},
    {position: 2, name: 'Helium', price: 2000, unitsAvailable: 200, status: 'desactivado'},
    {position: 3, name: 'Oxygen', price: 3500, unitsAvailable: 300, status: 'activo'},
    {position: 4, name: 'Carbon', price: 10000, unitsAvailable: 150, status: 'activo'},
    {position: 5, name: 'Nitrogen', price: 4000, unitsAvailable: 400, status: 'desactivado'},
    {position: 6, name: 'Neon', price: 1800, unitsAvailable: 250, status: 'activo'},
    {position: 7, name: 'Argon', price: 6000, unitsAvailable: 180, status: 'desactivado'},
    {position: 8, name: 'Krypton', price: 9000, unitsAvailable: 120, status: 'activo'},
    {position: 9, name: 'Xenon', price: 12000, unitsAvailable: 90, status: 'activo'},
    {position: 10, name: 'Radon', price: 3000, unitsAvailable: 350, status: 'desactivado'},
    {position: 11, name: 'Fluorine', price: 7000, unitsAvailable: 220, status: 'activo'},
    {position: 12, name: 'Chlorine', price: 2500, unitsAvailable: 280, status: 'activo'},
    {position: 13, name: 'Bromine', price: 8000, unitsAvailable: 160, status: 'desactivado'},
    {position: 14, name: 'Iodine', price: 11000, unitsAvailable: 100, status: 'activo'},
    {position: 15, name: 'Astatine', price: 1600, unitsAvailable: 300, status: 'activo'},
  ];

  displayedColumns: string[] = ['position', 'name', 'price','unitsAvailable','status','action'];
  dataSource = new MatTableDataSource(this.Listado);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
