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

    getIdSubCategory(): number {
        return this.idSubCategory;
    }

    setIdSubCategory(value: number) {
        this.idSubCategory = value;
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(value: string) {
        this.description = value;
    }

    getActive(): boolean {
        return this.active;
    }

    setActive(value: boolean) {
        this.active = value;
    }

    getIdCategory(): number {
        return this.idCategory;
    }

    setIdCategory(value: number) {
        this.idCategory = value;
    }
}
