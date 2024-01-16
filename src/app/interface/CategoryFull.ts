import { Category } from "./products/Category";
import { SubCategory } from "./products/SubCategory";

export class CategoryFull {

    private category: Category;
    private listSubCategories: Array<SubCategory>;

    constructor(category: Category, listSubCategories: Array<SubCategory>) {
        this.category = category
        this.listSubCategories = listSubCategories
    }

    public getCategory(): Category {
        return this.category;
    }

    public setCategory(category: Category): void {
        this.category = category;
    }

    public getListSubCategories(): Array<SubCategory> {
        return this.listSubCategories;
    }

    public setListSubCategories(listSubCategories: Array<SubCategory>): void {
        this.listSubCategories = listSubCategories;
    }

}