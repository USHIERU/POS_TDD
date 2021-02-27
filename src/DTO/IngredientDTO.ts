export default class IngredientDTO {
    public _id: string;
    public name: string;
    public quantity: number;
    public price: number;

    constructor(name: string, quantity: number, price = 0, id = '') {
        this._id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}