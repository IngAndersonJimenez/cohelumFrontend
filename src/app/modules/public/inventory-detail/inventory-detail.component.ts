import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {InventoryService} from "../../../services/inventory.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss']
})
export class InventoryDetailComponent implements OnInit{

  images: any[] | undefined;
  displayBasic: boolean | undefined;
  displayBasic2!: boolean;
  categoryId: number | null = null;
  details: any | null;
  pdfUrl: SafeResourceUrl;

  position: string = 'bottom';

  positionOptions = [
    {
      label: 'Bottom',
      value: 'bottom'
    },
    {
      label: 'Top',
      value: 'top'
    },
    {
      label: 'Left',
      value: 'left'
    },
    {
      label: 'Right',
      value: 'right'
    }
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(private route: ActivatedRoute, private inventoryService:InventoryService,private sanitizer: DomSanitizer) {
    this.images =
      [
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
          alt: 'Description for Image 2',
          title: 'Title 2'
        },
        {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
          alt: 'Description for Image 3',
          title: 'Title 3'
        }
      ]

    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/pdf/LM350.PDF');

  }


  ngOnInit(): void {
    this.categoryId = this.inventoryService.getSelectedCategoryId();
    this.details = this.inventoryService.getSelectedInventoryDetails();
    console.log('Llego category id a detalle: ',this.categoryId)
    console.log('Informacion: ',this.details)
  }


}
