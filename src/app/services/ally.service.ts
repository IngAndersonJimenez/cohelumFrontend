import { Injectable } from '@angular/core';
import { Aliado } from '../interface/allies/Aliado';
import { CityService } from './city.service';

@Injectable({
  providedIn: 'root'
})
export class AllyService {

  private listaAliados: Array<Aliado> = [];

  constructor(private cityService: CityService) { }

  loadListOfAlliesInMemory() {
    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/DecorAlvarezLogo.png',
      'DECORALVAREZ',
      'https://www.decoralvarez.com/shop?Marca=Cohelum',
      'Avenida 7e # 5- 57 Quinta Oriental',
      this.cityService.getCityByIdCity(9),
      '3143026085'
    )
    );

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/MueblesEstupiñanLogo.png',
      'MUEBLES ESTUPIÑAN',
      'https://mueblesestupinan.com/',
      'Calle 50 #15-88',
      this.cityService.getCityByIdCity(10),
      '3102123626'
    )
    );

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/EraLogo.png',
      'ERA DISEÑO',
      'https://eradiseno.com/proyectos/',
      'CR 2N #19-220 Variante la romelia',
      this.cityService.getCityByIdCity(11),
      '3112837841'
    )
    );

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/DiceHogarLogo.png',
      'DICEHOGAR',
      'https://dicehogar.com/linea-dicehogar/',
      'CR 56 #29-154 Guayabal',
      this.cityService.getCityByIdCity(12),
      '3005875466'
    )
    );

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/DecoinnovarLogo.png',
      'DECOINNOVAR',
      'https://www.instagram.com/decoinnovar_/',
      'AV 1Este #16-62 Caobos',
      this.cityService.getCityByIdCity(9),
      ''
    )
    );

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/Pisos&GresLogo.png',
      'PISOS Y GRES',
      'https://pisosygres.co/accesorios/',
      'Calle 15A #2E-68 Caobos',
      this.cityService.getCityByIdCity(9),
      '3125258705'
    )
    );

    this.listaAliados.push(new Aliado(
      '',
      'Casa Magna',
      'https://www.casa-magna.com/cohelum?_q=COHELUM&map=ft',
      'Cr 64 #80-102 Riomar',
      this.cityService.getCityByIdCity(15),
      '018000113880'
    )
    );

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/DeKoraLogo.png',
      'Dekora',
      'https://www.casa-magna.com/cohelum?_q=COHELUM&map=ft',
      'Cr 51 #82-126',
      this.cityService.getCityByIdCity(15),
      '3114052743 - 3145357196'
    )
    );

    this.listaAliados.push(new Aliado(
      '',
      'Scalatto',
      'https://scalatto.com.co/',
      'Cr 59B #79-217 Local 1',
      this.cityService.getCityByIdCity(15),
      '3205175164'
    )
    );

  }

  getListOfAllies(): Array<Aliado> {
    return this.listaAliados;
  }

  getAlliesByIdCity(idCity: number): Array<Aliado> {
    let alliesFilter: Array<Aliado> = [];
    for (let alliesIter of this.listaAliados) {
      if (alliesIter.getCiudad().getIdCity() == idCity) {
        alliesFilter.push(alliesIter);
      }
    }
    return alliesFilter;
  }


}
