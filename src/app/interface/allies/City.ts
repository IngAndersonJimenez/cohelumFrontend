import { Departamento } from "./Departamento";

export class City {

    private idCity: number;
    private descriptionCity: string;
    private departament: Departamento;
    private active: boolean;

    constructor(idCity: number, descriptionCity: string, departamento: Departamento, active: boolean) {
        this.descriptionCity = descriptionCity;
        this.idCity = idCity;
        this.departament = departamento;
        this.active = active
    }

    getIdCity(): number {
        return this.idCity;
    }

    getDescriptionCity(): string {
        return this.descriptionCity;
    }

    getDepartamento(): Departamento {
        return this.departament;
    }

    getActive(): boolean {
        return this.active;
    }

    setIdCity(idCity: number) {
        this.idCity = idCity;
    }

    setDescriptionCity(descriptionCity: string) {
        this.descriptionCity = descriptionCity;
    }

    setDepartament(departament: Departamento) {
        this.departament = departament;
    }

    setActive(active: boolean) {
        this.active = active;
    }

}