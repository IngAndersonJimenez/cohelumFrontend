import { Component } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-content-public',
  templateUrl: './content-public.component.html',
  styleUrls: ['./content-public.component.scss']
})
export class ContentPublicComponent {

  isActiveInventoty?: boolean;

  constructor(private inventoryService: InventoryService) {
    this.inventoryService.isActiveInventoryCurrent.subscribe(data=>{
      console.log("ContentPublicComponent")
      console.log(data)
      this.isActiveInventoty = data;
    });
  }


}
