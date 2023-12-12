export interface Product {
    responseDTO: {
        getInventoryDTO: {
            idInventory: number;
            name: string;
            price: number;
            unitsAvailable: number;
            active?:boolean

        }
        getInventoryDetailsDTO: {
            characteristic: string;
            datasheet?: string | null;
        }
        getInventoryCategoryDTO: {
            idCategory:number
            description: string
        }
        getInventoryImageDTO: {
            idInventoryImage:number;
            image?: string | null;
        }
    }
}
