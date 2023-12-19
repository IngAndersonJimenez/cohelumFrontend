import { Component, OnInit } from '@angular/core';
import { DepartamentService } from './services/departament.service';
import { CityService } from './services/city.service';
import { AllyService } from './services/ally.service';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'cohelum';

  constructor(private departamentService: DepartamentService, private cityService: CityService,
    private allyService: AllyService, private configService: ConfigService) { };

  isActiveLayout?: boolean;


  ngOnInit(): void {
    this.departamentService.loadDepartament();
    this.cityService.loadCitiesInMemory();
    this.allyService.loadListOfAlliesInMemory();


    this.configService.isActiveLayoutCurrent.subscribe(data => {
      this.isActiveLayout = data
    });
  }


}
