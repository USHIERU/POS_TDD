import IngredientDTO from './IngredientDTO';

export default class ProductDTO {
    public _id: string;
    public name: string;
    public quantity: number;
    public price: number;
    public recipe: IngredientDTO[];

    constructor(name: string, quantity: number, price: number, recipe = [], id = '') {
        this._id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.recipe = recipe;
    }

    addIngredient(ingredientDTO: IngredientDTO): void {
        this.recipe.push(ingredientDTO)
    }

    addIngredients(ingredientsDTO: IngredientDTO[]): void {
        this.recipe.push(... ingredientsDTO);
    }

    deleteIngredient(id: string) {
        this.recipe = this.recipe.filter(ingredientDTO => ingredientDTO._id !== id);
    }
}