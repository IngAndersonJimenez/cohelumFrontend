import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { Carrusel } from 'src/app/interface/home/carrusel';
import { LoginService } from 'src/app/services/login.service';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-slider-home',
  templateUrl: './slider-home.component.html',
  styleUrls: ['./slider-home.component.scss']
})
export class SliderHomeComponent implements OnInit {

  pathImage: string = environment.sourceImage;

  listaImagenesCarrusel: Array<Carrusel> = [];

  constructor(private settingsService: SettingsService, private loginService: LoginService) {
  }

  ngOnInit(): void {

    this.getTokenPublic();

   /* this.listaImagenesCarrusel.push(
      new Carrusel(this.pathImage + "/imagenes/home/carrusel/1_carrusel.jpg", "Titulo imagen 1", "SubTitulo imagen 1", "10000")
    );

    this.listaImagenesCarrusel.push(
      new Carrusel(this.pathImage + "/imagenes/home/carrusel/2_carrusel.jpg", "Titulo imagen 2", "SubTitulo imagen 2", "3000")
    );

    this.listaImagenesCarrusel.push(
      new Carrusel(this.pathImage + "/imagenes/home/carrusel/3_carrusel.jpg", "Titulo imagen 3", "SubTitulo imagen 3", "3000")
    );

    this.listaImagenesCarrusel.push(
      new Carrusel(this.pathImage + "/imagenes/home/carrusel/4_carrusel.jpg", "Titulo imagen 4", "SubTitulo imagen 4", "3000")
    );*/
  }


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

  private getItemsArtefacCarrusel(token: string) {
    let response: any;
    this.settingsService.getElementsByArtefact("CarruselHome", token).subscribe(data => {

      response = data

      for (let iter of response.responseDTO) {
        this.listaImagenesCarrusel.push(
          new Carrusel(this.pathImage + iter.value4, iter.value1, iter.value2, "10000")
        );
      }

    });
  }

  private getTokenPublic() {
    this.loginService.getTokenPublicS().subscribe(data => {
      this.getItemsArtefacCarrusel(data.token);
    }
    );
  }


}
