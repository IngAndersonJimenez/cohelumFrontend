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
    ));

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/AmbientaStudioLogo.png',
      'AMBIENTA STUDIO',
      'https://beacons.ai/ambientastudio/?fbclid=PAAabw9rdq4Ztf4pMq7dscIalVG1SWk78h0FzXdax26twh14CsE6zbURNf3IY_aem_ATjeWfYcVygvL25LTT3uvks7UVH6YHBuyMSlw_l1-dNwLgNUY_PelPRvwd_y9HN6Bg0',
      'Cl 42 #33-31 ',
      this.cityService.getCityByIdCity(10),
      '3174369749'
    ));

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/ArteMarmolLogo.jpg',
      'ARTE MARMOL',
      'https://artemarmolcolombia.com',
      'Km 7 Autopista Piedecuesta',
      this.cityService.getCityByIdCity(10),
      '3214483769'
    ));

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/EraLogo.png',
      'ERA DISEÑO',
      'https://eradiseno.com/proyectos/',
      'CR 2N #19-220 Variante la romelia',
      this.cityService.getCityByIdCity(11),
      '3112837841'
    ));


    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/EspacioIntegralLogo.png',
      'SU ESPACIO INTEGRAL',
      'https://www.suespaciointegral.com',
      'Bodegas Santa Ana Bodega 2 DosQuebradas',
      this.cityService.getCityByIdCity(11),
      '3156053294'
    )
    );

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/MoganoLogo1.png',
      'MOGANO GOODS',
      'http://mogano.com.co/home/',
      'Cl 13 #15-33 ED Torre Nucleo Local 3',
      this.cityService.getCityByIdCity(11),
      '3146804184'
    )
    );

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/DecorCentroLogo.png',
      'STRUKTURA',
      'https://www.decorcentro.com.co',
      'CR 7 #38-26 Centro',
      this.cityService.getCityByIdCity(11),
      '3136667340'
    )
    );


    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/DiceHogarLogo.png',
      'DICEHOGAR',
      'https://dicehogar.com/linea-dicehogar/',
      'CR 56 #29-154 Guayabal',
      this.cityService.getCityByIdCity(12),
      '3005875466'
    ));

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/CasaMagnaLogo.png',
      'CASAMAGNA',
      'https://www.casa-magna.com/cohelum?_q=COHELUM&map=ft',
      'Cr 43A, Av. El Poblado #6Sur-15',
      this.cityService.getCityByIdCity(12),
      '018000113880'
    ));


    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/LaCasaIdealLogo.png',
      'LA CASA IDEAL SAS',
      'https://www.lacasaideal.com.co',
      'Cr 43A #1-85 ED Caja Social Oficina 213',
      this.cityService.getCityByIdCity(12),
      '3105143147'
    ));

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/ArquitecLogo.png',
      'ARQUITEC GROUP AG SAS',
      'https://www.arquitecgroup.com',
      'C.C Ideo Cr 42 #75-83 Local 228 Itagui',
      this.cityService.getCityByIdCity(12),
      '3212027385 - 3213430692'
    ));

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
      'assets/image/ourAllies/AmbientesDiseños.png',
      'AMBIENTES Y DISEÑOS',
      'https://www.instagram.com/aydcucuta/?igshid=OGQ5ZDc2ODk2ZA%3D%3D',
      'CALLE 16 # 3E - 41 Los Caobos',
      this.cityService.getCityByIdCity(9),
      '3186082426'
    ));

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/AmbientesNossaLogo.jpg',
      'AMBIENTES NOSSA',
      'https://www.instagram.com/ambientesnossa1/?igshid=OGQ5ZDc2ODk2ZA%3D%3D',
      'AV O # 18 - 25 BLANCO ',
      this.cityService.getCityByIdCity(9),
      '310 8171013'
    ));

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/DelCorteAngaritaLogo.png',
      'DEL CORTE ANGARITA',
      'https://delcorteangarita.co/',
      'AV 2 ESTE # 13A - 51 Los Caobos',
      this.cityService.getCityByIdCity(9),
      '3232909224'
    ));

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
    ));


    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/UsaLogo.png',
      'USA ELECTRODOMESTICOS SAS',
      'https://usaelectrodomesticos.com.co/?s=COHELUM&post_type=product',
      'AV 6 Norte #29AN-48',
      this.cityService.getCityByIdCity(13),
      '3174237885'
    ));

    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/MobiliariLogo.png',
      'DEL CORTE MOBILIARI SAS',
      'https://www.dcmobiliario.com',
      'AV 6 Norte # 29AN-60 Santa Monica',
      this.cityService.getCityByIdCity(13),
      '3152700908'
    ));


    this.listaAliados.push(new Aliado(
      'assets/image/ourAllies/ArquitecLogo.png',
      'ARQUITEC GROUP AG SAS',
      'https://www.arquitecgroup.com',
      'C.C Ideo Cr 42 #75-83 Local 228 Itagui',
      this.cityService.getCityByIdCity(13),
      '3202964320'
    ));


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
