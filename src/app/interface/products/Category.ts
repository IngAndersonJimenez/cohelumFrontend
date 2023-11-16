export class Category {

    private idCategory: number;
    private description: string;
    private imageCategory: string;

    constructor(description: string, imageCategory: string, idCategory: number) {
        this.description = description;
        this.imageCategory = imageCategory;
        this.idCategory = idCategory;
    }

    getDescription(): string {
        return this.description;
    }

    getImageCategory(): string {
        return this.imageCategory;
    }

    getIdCategory(): number {
        return this.idCategory;
    }

    setDescription(description: string) {
        this.description = description;
    }

    setImageCategory(imageCategory: string) {
        this.imageCategory = imageCategory;
    }


    setIdCategory(idCategory: number) {
        this.idCategory = idCategory;
    }


}