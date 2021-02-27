import IngredientDTO from './IngredientDTO';

export default class ProductDTO {
    public _id: string;
    public name: string;
    public quantity: number;
    public price: number;
    public recipe: IngredientDTO[];

    constructor(_name: string | object, quantity?: number, price?: number, recipe = [], id = '') {
        if (typeof _name === 'object') {
            const { _id, name, quantity, price, recipe } = _name as ProductDTO;
            this._id = _id;
            this.name = name;
            this.quantity = quantity;
            this.price = price;
            this.recipe = recipe;
        } else if (typeof _name === 'string') {
            this._id = id;
            this.name = _name;
            this.quantity = quantity;
            this.price = price;
            this.recipe = recipe;
        }
    }

    addIngredient(ingredientDTO: IngredientDTO): void {
        this.recipe.push(ingredientDTO)
    }

    addIngredients(ingredientsDTO: IngredientDTO[]): void {
        this.recipe.push(...ingredientsDTO);
    }

    deleteIngredient(id: string) {
        this.recipe = this.recipe.filter(ingredientDTO => ingredientDTO._id !== id);
    }
}