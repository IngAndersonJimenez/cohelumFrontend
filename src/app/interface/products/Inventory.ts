export interface Inventory{
    idInventory:number;
    name: string;
    price: number;
    unitsAvailable: number;
    categoryId:number;
    characteristic: string;
    datasheet: string;
    image?: File | null; //
}
