import {Component, OnInit} from '@angular/core';
import {InventoryService} from "../../../services/inventory.service";

@Component({
  selector: 'app-us',
  templateUrl: './us.component.html',
  styleUrls: ['./us.component.scss']
})
export class UsComponent implements OnInit{
  ngOnInit(): void {
  }

  constructor(private inventoryService:InventoryService) {
  }




}
