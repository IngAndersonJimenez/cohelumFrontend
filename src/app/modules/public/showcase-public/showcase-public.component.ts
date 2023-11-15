import { Component } from '@angular/core';
import { ShowCaseGallery } from 'src/app/model/ShowCaseGallery';

@Component({
  selector: 'app-showcase-public',
  templateUrl: './showcase-public.component.html',
  styleUrls: ['./showcase-public.component.scss']
})
export class ShowcasePublicComponent {

  gallery: Array<ShowCaseGallery> = [];

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

  activeIndex: number = 0;

  titleInformative: string = '';
  description: string = '';

  constructor() {

    this.gallery.push(
      new ShowCaseGallery(
        '1', 'assets/image/showcase/showcase3.jpg', 'Acabados de vanguardia y última generación para la familia',
        'Descubre la elegancia y durabilidad que solo un pozuelo en acero puede ofrecer.' +
        '💎 Con un brillo que perdura y una resistencia inigualable, nuestros pozuelos de acero son la elección inteligente para tu cocina.'
      )
    );

    this.gallery.push(
      new ShowCaseGallery('2',
        'assets/image/showcase/showcase4.jpg', 'Acabados de vanguardia y última generación para la oficina',
        'Eleva tu cocina a otro nivel con la belleza y funcionalidad de una grifería en acero.' +
        '✨ Descubre la diferencia que hace la calidad en cada detalle.'
      )
    );

    this.changeData(0);

  }

  changeData(index: number) {
    console.log('changeData');
    console.log(index);

    console.log(
      this.gallery[index].getTitleInfo()
    );

    this.titleInformative = this.gallery[index].getTitleInfo();
    this.description = this.gallery[index].getDescription();

  }


}
