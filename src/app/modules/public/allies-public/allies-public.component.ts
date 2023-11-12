import { Component } from '@angular/core';
import { Aliado } from 'src/app/interface/allies/Aliado';

@Component({
  selector: 'app-allies-public',
  templateUrl: './allies-public.component.html',
  styleUrls: ['./allies-public.component.scss']
})
export class AlliesPublicComponent {

  listaAliados: Array<Aliado> = [];
  responsiveOptions: any[] | undefined;

  constructor() {
    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/DecorAlvarezLogo.png',
      'DECORALVAREZ',
      'https://www.decoralvarez.com/shop?Marca=Cohelum',
      'Avenida 7e # 5- 57 Quinta Oriental',
      'Cúcuta, Norte de Santander',
      '3143026085'
    )
    );

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/MueblesEstupiñanLogo.png',
      'MUEBLES ESTUPIÑAN',
      'https://mueblesestupinan.com/',
      'Calle 50 #15-88',
      'Bucaramanga ',
      '3102123626'
    )
    );

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/EraLogo.png',
      'ERA DISEÑO',
      'https://eradiseno.com/proyectos/',
      'CR 2N #19-220 Variante la romelia',
      'Risaralda, Pereira',
      '3112837841'
    )
    );

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/DiceHogarLogo.png',
      'DICEHOGAR',
      'https://dicehogar.com/linea-dicehogar/',
      'CR 56 #29-154 Guayabal',
      'Medellin, Antioquia',
      '3005875466'
    )
    );

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/DecoinnovarLogo.png',
      'DECOINNOVAR',
      'https://www.instagram.com/decoinnovar_/',
      'AV 1Este #16-62 Caobos',
      'Cúcuta, Norte de Santander',
      ''
    )
    );

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/Pisos&GresLogo.png',
      'PISOS Y GRES',
      'https://pisosygres.co/accesorios/',
      'Calle 15A #2E-68 Caobos',
      'Cúcuta, Norte de Santander',
      '3125258705'
    )
    );

    console.log(this.listaAliados);
    console.log(this.listaAliados[0].getUrlLogo());


  }

}
