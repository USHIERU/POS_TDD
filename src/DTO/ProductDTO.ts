import IngredientDTO from './IngredientDTO';

export default class ProductDTO {
    public _id: string;
    public name: string;
    public quantity: number;
    public price: number;
    public recipe: IngredientDTO[];
}