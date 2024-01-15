export class SettingFullTP {

    private artefact: string;
    private description: string;
    private idSettingTP: number;
    private value1: string;
    private value2: string;
    private value3: string;
    private value4: string;

    constructor(
        artefact: string,
        description: string, idSettingTP: number,
        value1: string, value2: string,
        value3: string, value4: string
    ) {
        this.artefact = artefact
        this.description = description
        this.idSettingTP = idSettingTP
        this.value1 = value1
        this.value2 = value2
        this.value3 = value3
        this.value4 = value4
    }

    public getArtefact(): string {
        return this.artefact;
    }

    public setArtefact(artefact: string): void {
        this.artefact = artefact;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getIdSettingTP(): number {
        return this.idSettingTP;
    }

    public setIdSettingTP(idSettingTP: number): void {
        this.idSettingTP = idSettingTP;
    }

    public getValue1(): string {
        return this.value1;
    }

    public setValue1(value1: string): void {
        this.value1 = value1;
    }

    public getValue2(): string {
        return this.value2;
    }

    public setValue2(value2: string): void {
        this.value2 = value2;
    }

    public getValue3(): string {
        return this.value3;
    }

    public setValue3(value3: string): void {
        this.value3 = value3;
    }

    public getValue4(): string {
        return this.value4;
    }

    public setValue4(value4: string): void {
        this.value4 = value4;
    }

}