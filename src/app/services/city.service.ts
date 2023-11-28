import { Injectable } from '@angular/core';
import { City } from '../interface/allies/City';
import { DepartamentService } from './departament.service';
import { Departamento } from '../interface/allies/Departamento';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private cities: Array<City> = [];

  constructor(private departamentService: DepartamentService) { }

  loadCitiesInMemory() {
    this.cities.push(new City(1, "El Encanto", this.departamentService.getDepartamentById(1), false));
    this.cities.push(new City(2, "La Chorrera", this.departamentService.getDepartamentById(1), false));
    this.cities.push(new City(3, "Abejorral", this.departamentService.getDepartamentById(2), false));
    this.cities.push(new City(4, "Abriaqui", this.departamentService.getDepartamentById(2), false));
    this.cities.push(new City(5, "Arauca", this.departamentService.getDepartamentById(3), false));
    this.cities.push(new City(6, "Arauquita", this.departamentService.getDepartamentById(3), false));
    this.cities.push(new City(7, "Providencia", this.departamentService.getDepartamentById(4), false));
    this.cities.push(new City(8, "San Andres", this.departamentService.getDepartamentById(4), false));
    this.cities.push(new City(9, "Cucuta", this.departamentService.getDepartamentById(24), true));
    this.cities.push(new City(10, "Bucaramanga", this.departamentService.getDepartamentById(28), true));
    this.cities.push(new City(11, "Pereira", this.departamentService.getDepartamentById(27), true));
    this.cities.push(new City(12, "Medellin", this.departamentService.getDepartamentById(2), true));
    this.cities.push(new City(13, "Cali", this.departamentService.getDepartamentById(31), true));
    this.cities.push(new City(14, "Bogota", this.departamentService.getDepartamentById(6), true));
    this.cities.push(new City(15, "Barranquilla", this.departamentService.getDepartamentById(5), true));
    this.cities.push(new City(16, "Manizales", this.departamentService.getDepartamentById(9), true));
  }

  getCities(): Array<City> {
    return this.cities;
  }

  getCitiesByIdDepartament(idDepartament: number): Array<City> {
    let citiesFilter: Array<City> = [];
    for (let cityIter of this.cities) {
      if (cityIter.getDepartamento().getIdDepartamento() == idDepartament && cityIter.getActive() == true) {
        citiesFilter.push(cityIter);
      }
    }
    return citiesFilter;
  }

  getCityByIdCity(idCity: number): City {
    let cityFilter: City = new City(0, '', new Departamento(0, '', false), false);
    for (let cityIter of this.cities) {
      if (cityIter.getIdCity() == idCity) {
        cityFilter = cityIter;
        break;
      }
    }
    return cityFilter;
  }

  getCitiesAllActive(): Array<City> {
    let citiesFilter: Array<City> = [];

    for (let cityIter of this.cities) {
      if (cityIter.getActive() == true) {
        citiesFilter.push(cityIter);
      }
    }

    return citiesFilter;
  }

}
