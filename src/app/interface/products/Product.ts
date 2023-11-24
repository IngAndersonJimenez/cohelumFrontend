export interface Product{
    responseDTO:{
        getInventoryDTO: {
            idInventory:number;
            name:string;
            price:number;
            unitsAvailable:number;

        }
        getInventoryDetailsDTO:{
            characteristic:string;
            datasheet?: string  | null;
        }
        getInventoryCategoryDTO:{
            description: string
        }
        getInventoryImageDTO: {
            image?: string | null;
        }
    }
}
