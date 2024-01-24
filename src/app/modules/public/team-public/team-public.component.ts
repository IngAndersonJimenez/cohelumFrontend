import { Component } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Carrusel } from 'src/app/interface/home/carrusel';


@Component({
  selector: 'app-team-public',
  templateUrl: './team-public.component.html',
  styleUrls: ['./team-public.component.scss']
})
export class TeamPublicComponent {

  images: any[] = [];
  responsiveOptions: any[] | undefined;
  pathImage: string = environment.sourceImage;

  listaImagenesCarrusel: Array<Carrusel> = [];


  constructor() {
    this.responsiveOptions = [
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


    this.images?.push(
      {
        itemImageSrc: 'assets/image/experiences/CUORE.jpg',
        thumbnailImageSrc: 'assets/image/experiences/CUORETum.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      {
        itemImageSrc: 'assets/image/experiences/CUORE4.jpg',
        thumbnailImageSrc: 'assets/image/experiences/CUORE4Tum.jpg',
        alt: 'Description for Image 2',
        title: 'Title 2'
      },
      {
        itemImageSrc: 'assets/image/experiences/Video1.mp4',
        thumbnailImageSrc: 'assets/image/experiences/CUORE4Tum.jpg',
        alt: 'Description for imagen 3',
        title: 'Title 3'
      },
      {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
        alt: 'Description for Image 4',
        title: 'Title 4'
      }
    );

   /* this.listaImagenesCarrusel.push(
      new Carrusel("assets/image/experiences/Video1.mp4", "Titulo imagen 1", "SubTitulo imagen 1", "10000")
    );*/

    this.listaImagenesCarrusel.push(
      new Carrusel("assets/image/experiences/Video2.mp4", "Titulo imagen 1", "SubTitulo imagen 1", "10000")
    );

  }





}
