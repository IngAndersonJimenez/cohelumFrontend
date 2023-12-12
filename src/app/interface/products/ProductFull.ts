import { SafeResourceUrl } from "@angular/platform-browser";

export class ProductFull {
    private _idInventory: number;
    private _name: string;
    private _price: number;
    private _unitsAvailable: number;
    private _active: boolean;
    private _characteristic: string;
    private _datasheet: SafeResourceUrl | null;
    private _idCategory: number;
    private _description: string;
    private _idInventoryImage: number;
    private _image: string | null;

    constructor(idInventory: number, name: string, price: number, unitsAvailable: number, active: boolean, characteristic: string, datasheet: SafeResourceUrl | null, idCategory: number, description: string, idInventoryImage: number, image: string | null) {
        this._idInventory = idInventory;
        this._name = name;
        this._price = price;
        this._unitsAvailable = unitsAvailable;
        this._active = active;
        this._characteristic = characteristic;
        this._datasheet = datasheet;
        this._idCategory = idCategory;
        this._description = description;
        this._idInventoryImage = idInventoryImage;
        this._image = image;
    }

    get idInventory(): number {
        return this._idInventory;
    }

    set idInventory(value: number) {
        this._idInventory = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get unitsAvailable(): number {
        return this._unitsAvailable;
    }

    set unitsAvailable(value: number) {
        this._unitsAvailable = value;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }

    get characteristic(): string {
        return this._characteristic;
    }

    set characteristic(value: string) {
        this._characteristic = value;
    }

    get datasheet(): SafeResourceUrl | null {
        return this._datasheet;
    }

    set datasheet(value: SafeResourceUrl | null) {
        this._datasheet = value;
    }

    get idCategory(): number {
        return this._idCategory;
    }

    set idCategory(value: number) {
        this._idCategory = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get idInventoryImage(): number {
        return this._idInventoryImage;
    }

    set idInventoryImage(value: number) {
        this._idInventoryImage = value;
    }

    get image(): string | null {
        return this._image;
    }

    set image(value: string | null) {
        this._image = value;
    }
}
