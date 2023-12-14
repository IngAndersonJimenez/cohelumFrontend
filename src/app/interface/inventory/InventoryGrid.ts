export class InventoryGrid {

    private descriptionCategory: string;
    private descriptionInventory: string;
    private price: number;
    private unitsAvaible: number;
    private images: Array<string>;
    private imageInitial: string;
    private imageSecond: string;


    constructor(descriptionCategory: string, descriptionInventory: string, price: number,
        unitsAvaible: number, imageInitial: string, imageSecond: string, images: Array<string>
    ) {
        this.descriptionCategory = descriptionCategory
        this.descriptionInventory = descriptionInventory
        this.price = price
        this.unitsAvaible = unitsAvaible
        this.imageInitial = imageInitial
        this.imageSecond = imageSecond
        this.images = images
    }

    public getDescriptionCategory(): string {
        return this.descriptionCategory;
    }

    public setDescriptionCategory(descriptionCategory: string): void {
        this.descriptionCategory = descriptionCategory;
    }

    public getDescriptionInventory(): string {
        return this.descriptionInventory;
    }

    public setDescriptionInventory(descriptionInventory: string): void {
        this.descriptionInventory = descriptionInventory;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getUnitsAvaible(): number {
        return this.unitsAvaible;
    }

    public setUnitsAvaible(unitsAvaible: number): void {
        this.unitsAvaible = unitsAvaible;
    }

    public getImageInitial(): string {
        return this.imageInitial;
    }

    public setImageInitial(imageInitial: string): void {
        this.imageInitial = imageInitial;
    }

    public getImageSecond(): string {
        return this.imageSecond;
    }

    public setImageSecond(imageSecond: string): void {
        this.imageSecond = imageSecond;
    }

    public getImages(): Array<string> {
        return this.images;
    }

    public setImages(images: Array<string>): void {
        this.images = images;
    }


}