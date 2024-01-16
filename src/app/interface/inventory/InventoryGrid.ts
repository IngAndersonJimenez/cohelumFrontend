export class InventoryGrid {

    private descriptionCategory: string;
    private descriptionInventory: string;
    private price: number;
    private unitsAvaible: number;
    private images: Array<string>;
    private imageInitial: string;
    private imageSecond: string;
    private idCategory: number;
    private idSubCategory: number;
    private name: string
    private characteristic: string
    private datasheet: string
    private idInventory: number

    constructor(descriptionCategory: string, descriptionInventory: string, price: number,
        unitsAvaible: number, imageInitial: string, imageSecond: string, images: Array<string>, idCategory: number,
        idSubCategory: number,
        name: string, characteristic: string, datasheet: string, idInventory: number
    ) {
        this.descriptionCategory = descriptionCategory
        this.descriptionInventory = descriptionInventory
        this.price = price
        this.unitsAvaible = unitsAvaible
        this.imageInitial = imageInitial
        this.imageSecond = imageSecond
        this.images = images
        this.idCategory = idCategory
        this.idSubCategory = idSubCategory
        this.name = name
        this.characteristic = characteristic
        this.datasheet = datasheet
        this.idInventory = idInventory
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

    public getIdInventory(): number {
        return this.idInventory;
    }

    public setIdInventory(idInventory: number): void {
        this.idInventory = idInventory;
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

    public getIdCategory(): number {
        return this.idCategory;
    }

    public setIdCategory(idCategory: number): void {
        this.idCategory = idCategory;
    }

    public getIdSubCategory(): number {
        return this.idSubCategory;
    }

    public setIdSubCategory(idSubCategory: number): void {
        this.idSubCategory = idSubCategory;
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string) {
        this.name = value;
    }

    public getCharacteristic(): string {
        return this.characteristic;
    }

    public setCharacteristic(value: string) {
        this.characteristic = value;
    }

    public getDatasheet(): string {
        return this.datasheet;
    }

    public setDatasheet(value: string) {
        this.datasheet = value;
    }

}
