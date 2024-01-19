import { Component } from '@angular/core';
import { Aliado } from 'src/app/interface/allies/Aliado';
import { City } from 'src/app/interface/allies/City';
import { Departamento } from 'src/app/interface/allies/Departamento';
import { AllyService } from 'src/app/services/ally.service';
import { CityService } from 'src/app/services/city.service';
import { DepartamentService } from 'src/app/services/departament.service';
import { SelectItemGroup } from 'primeng/api';

@Component({
  selector: 'app-allies-public',
  templateUrl: './allies-public.component.html',
  styleUrls: ['./allies-public.component.scss']
})
export class AlliesPublicComponent {

  listaAliados: Array<Aliado> = [];
  responsiveOptions: any[] | undefined;
  public departamentList: Array<Departamento> = [];
  public cityList: Array<City> = [];
  public isActiveControlCity: boolean = false;

  groupedCities: SelectItemGroup[] = [];
  selectedCity: string | undefined;

  constructor(private departamentService: DepartamentService, private cityService: CityService,
    private allyService: AllyService) {
    this.listaAliados = this.allyService.getListOfAllies();
    this.departamentList = this.departamentService.getDepartamentAllActive();
    this.cityList = this.cityService.getCitiesAllActive();
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '1220px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '1100px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }


  getCitiesByIdDepartament(idDepartament: any) {

    if (idDepartament.target.value == 0) {
      this.listaAliados = this.allyService.getListOfAllies();
      this.isActiveControlCity = false;
    } else {
      this.cityList = this.cityService.getCitiesByIdDepartament(idDepartament.target.value);
      this.isActiveControlCity = true;
    }

  }

  getAlliesByIdCity(idCity: any) {
    this.listaAliados = this.allyService.getAlliesByIdCity(idCity.target.value);
  }


}
