import { Injectable } from '@angular/core';
import { Departamento } from '../interface/allies/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  private departament: Array<Departamento> = [];

  constructor() { }

  loadDepartament() {
    this.departament.push(new Departamento(1, 'Amazonas', false));
    this.departament.push(new Departamento(2, 'Antioquia', true));
    this.departament.push(new Departamento(3, 'Arauca', false));
    this.departament.push(new Departamento(4, 'Archipielago de San Andres', false));
    this.departament.push(new Departamento(5, 'Atlantico', true));
    this.departament.push(new Departamento(6, 'Bogota DC', true));
    this.departament.push(new Departamento(7, 'Bolivar', false));
    this.departament.push(new Departamento(8, 'Boyaca', false));
    this.departament.push(new Departamento(9, 'Caldas', true));
    this.departament.push(new Departamento(10, 'Caqueta', false));
    this.departament.push(new Departamento(11, 'Casanare', false));
    this.departament.push(new Departamento(12, 'Cauca', false));
    this.departament.push(new Departamento(13, 'Cesar', false));
    this.departament.push(new Departamento(14, 'Choco', false));
    this.departament.push(new Departamento(15, 'Cordoba', false));
    this.departament.push(new Departamento(16, 'Cundinamarca', false));
    this.departament.push(new Departamento(17, 'Guainia', false));
    this.departament.push(new Departamento(18, 'Guaviare', false));
    this.departament.push(new Departamento(19, 'Huila', false));
    this.departament.push(new Departamento(20, 'La Guajira', false));
    this.departament.push(new Departamento(21, 'Magdalena', false));
    this.departament.push(new Departamento(22, 'Meta', false));
    this.departament.push(new Departamento(23, 'Nariño', false));
    this.departament.push(new Departamento(24, 'Norte de Santander', true));
    this.departament.push(new Departamento(25, 'Putumayo', false));
    this.departament.push(new Departamento(26, 'Quindio', false));
    this.departament.push(new Departamento(27, 'Risaralda', true));
    this.departament.push(new Departamento(28, 'Santander', true));
    this.departament.push(new Departamento(29, 'Sucre', false));
    this.departament.push(new Departamento(30, 'Tolima', false));
    this.departament.push(new Departamento(31, 'Valle del Cauca', true));
  }

  getDepartamentAll(): Array<Departamento> {
    return this.departament;
  }

  getDepartamentAllActive(): Array<Departamento> {

    let departamentActive: Array<Departamento> = [];

    for (let departamentIter of this.departament) {
      if (departamentIter.getActive().valueOf() == true) {
        departamentActive.push(departamentIter);
      }
    }
    console.log("departamentos activos")
    console.log(departamentActive)
    return departamentActive;
  }

  getDepartamentById(departamentId: number): Departamento {

    let departamentResult: Departamento = new Departamento(0, '', false);

    for (let departamentIter of this.departament) {
      if (departamentIter.getIdDepartamento() == departamentId) {
        departamentResult = departamentIter;
        break;
      }
    }

    return departamentResult;
  }


}
