export class Departamento {

    private idDepartamento: number;
    private descripcionDepartamento: string;
    private active: boolean;

    constructor(idDepartamento: number, descripcionDepartamento: string, active: boolean) {
        this.descripcionDepartamento = descripcionDepartamento;
        this.idDepartamento = idDepartamento;
        this.active = active
    }

    getIdDepartamento(): number {
        return this.idDepartamento;
    }

    getDescripcionDepartamento(): string {
        return this.descripcionDepartamento;
    }

    getActive(): boolean {
        return this.active;
    }

    setIdDepartamento(idDepartamento: number) {
        this.idDepartamento = idDepartamento;
    }

    setDescripcionDepartamento(descripcionDepartamento: string) {
        this.descripcionDepartamento = descripcionDepartamento;
    }

    setActive(active: boolean) {
        this.active = active;
    }

}