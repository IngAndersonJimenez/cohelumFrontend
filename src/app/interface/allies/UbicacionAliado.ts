import { Departamento } from "./Departamento";

export class UbicacionAliado {

    private idUbicacion: number;
    private departamento: Departamento;

    constructor(idUbicacion: number, departamento: Departamento) {
        this.idUbicacion = idUbicacion;
        this.departamento = departamento;
    }

    getIdUbicacion() {
        return this.idUbicacion;
    }

    getDepartamento() {
        return this.departamento;
    }

    setIdUbicacion(idUbicacion: number) {
         this.idUbicacion = idUbicacion;
    }

    setDepartamento(departamento: Departamento) {
         this.departamento = departamento;
    }


} 