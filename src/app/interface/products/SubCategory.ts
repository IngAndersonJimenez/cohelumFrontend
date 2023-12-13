export class SubCategory {
    private idSubCategory: number;
    private description: string;
    private active: boolean;
    private idCategory: number;
    public isEditing: boolean = false;

    constructor(idSubCategory: number, description: string, active: boolean, idCategory: number) {
        this.idSubCategory = idSubCategory;
        this.description = description;
        this.active = active;
        this.idCategory = idCategory;
    }

    get getIdSubCategory(): number {
        return this.idSubCategory;
    }

    set setIdSubCategory(value: number) {
        this.idSubCategory = value;
    }

    get getDescription(): string {
        return this.description;
    }

    set setDescription(value: string) {
        this.description = value;
    }

    get getActive(): boolean {
        return this.active;
    }

    set setActive(value: boolean) {
        this.active = value;
    }

    get getIdCategory(): number {
        return this.idCategory;
    }

    set setIdCategory(value: number) {
        this.idCategory = value;
    }
}
