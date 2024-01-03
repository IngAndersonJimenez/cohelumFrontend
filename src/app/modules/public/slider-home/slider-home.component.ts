import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Carrusel } from 'src/app/interface/home/carrusel';


@Component({
  selector: 'app-slider-home',
  templateUrl: './slider-home.component.html',
  styleUrls: ['./slider-home.component.scss']
})
export class SliderHomeComponent implements OnInit {

  pathImage: string = environment.sourceImage;

  listaImagenesCarrusel: Array<Carrusel> = [];

  constructor() {}

  ngOnInit(): void {
    this.listaImagenesCarrusel.push(
      new Carrusel(this.pathImage + "/imagenes/home/carrusel/1_carrusel.jpg", "Prueba", "Sub Prueba", "10000")
    );

    this.listaImagenesCarrusel.push(
      new Carrusel(this.pathImage + "/imagenes/home/carrusel/2_carrusel.jpg", "Prueba", "Sub Prueba", "3000")
    );

    this.listaImagenesCarrusel.push(
      new Carrusel(this.pathImage + "/imagenes/home/carrusel/3_carrusel.jpg", "Prueba", "Sub Prueba", "3000")
    );

    this.listaImagenesCarrusel.push(
      new Carrusel(this.pathImage + "/imagenes/home/carrusel/4_carrusel.jpg", "Prueba", "Sub Prueba", "3000")
    );
  }

}
