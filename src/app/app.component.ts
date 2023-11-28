import { Component, OnInit } from '@angular/core';
import { DepartamentService } from './services/departament.service';
import { CityService } from './services/city.service';
import { AllyService } from './services/ally.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'cohelum';

  constructor(private departamentService: DepartamentService, private cityService:CityService, private allyService: AllyService) { };


  ngOnInit(): void {
    this.departamentService.loadDepartament();
    this.cityService.loadCitiesInMemory();
    this.allyService.loadListOfAlliesInMemory();
  }

}
