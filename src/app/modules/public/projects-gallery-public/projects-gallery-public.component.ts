import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-gallery-public',
  templateUrl: './projects-gallery-public.component.html',
  styleUrls: ['./projects-gallery-public.component.scss']
})
export class ProjectsGalleryPublicComponent implements OnInit {

  images: any[] = [];

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

  constructor() {

    this.images?.push(
      {
        itemImageSrc: 'assets/image/experiences/Proyecto1.jpg',
        thumbnailImageSrc: 'assets/image/experiences/Proyecto1Miniatura.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      {
        itemImageSrc: 'assets/image/experiences/Proyecto2.jpg',
        thumbnailImageSrc: 'assets/image/experiences/Proyecto2Miniatura.jpg',
        alt: 'Description for Image 2',
        title: 'Title 2'
      },
      {
        itemImageSrc: 'assets/image/experiences/Proyecto3.jpg',
        thumbnailImageSrc: 'assets/image/experiences/Proyecto3Miniatura.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      {
        itemImageSrc: 'assets/image/experiences/Proyecto4.jpg',
        thumbnailImageSrc: 'assets/image/experiences/Proyecto4Miniatura.jpg',
        alt: 'Description for Image 2',
        title: 'Title 2'
      },
      {
        itemImageSrc: 'assets/image/experiences/Proyecto1.jpg',
        thumbnailImageSrc: 'assets/image/experiences/Proyecto1Miniatura.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
      }
    );

  }

  ngOnInit() {
  }



}
