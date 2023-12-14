import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/products/Category';
import { InventoryService } from 'src/app/services/inventory.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-product-public',
  templateUrl: './product-public.component.html',
  styleUrls: ['./product-public.component.scss']
})
export class ProductPublicComponent implements OnInit {

  categories: Array<Category> = [];
  responsiveOptions: any[] | undefined;
  category: Array<any> = [];

  constructor(private inventoryService: InventoryService, private loginService: LoginService) { };

  ngOnInit() {

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.getTokenPublic();

  }

  private getTokenPublic() {
    this.loginService.getTokenPublicS().subscribe(data => {
      this.getCategories(data.token);
    }
    );
  }

  private getCategories(token: string) {
    let response: any;
    this.inventoryService.getCategory(token).subscribe(data => {
      response = data;
      this.category = response.responseDTO;
    });
  }


  activateSectionInventory() {
    console.log("Activando seccion");
    this.inventoryService.activeSectionInventoty(true);
  }


}
