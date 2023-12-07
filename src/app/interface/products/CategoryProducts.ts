export class CategoryProducts {

    private idCategory: number;
    private description: string;
    private statusCategory: boolean;
    private image: string;
    public isEditing: boolean = false

    constructor(idCategory: number, description: string, statusCategory: boolean, image: string) {
        this.idCategory = idCategory;
        this.description = description;
        this.statusCategory = statusCategory;
        this.image = image;
    }


    getIdCategory(): number {
        return this.idCategory;
    }

    setIdCategory(value: number) {
        this.idCategory = value;
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(value: string) {
        this.description = value;
    }

    getStatusCategory(): boolean {
        return this.statusCategory;
    }

    setStatusCategory(value: boolean) {
        this.statusCategory = value;
    }

    getImage(): string {
        return this.image;
    }

    setImage(value: string) {
        this.image = value;
    }
}
