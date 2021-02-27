export default class IngredientDTO {
    public _id: string;
    public name: string;
    public quantity: number;
    public price: number;

    constructor(_name: string | object, quantity?: number, price = 0, id = '') {
        if (typeof _name === 'object') {
            const { _id, name, quantity, price } = _name as IngredientDTO;
            this._id = _id;
            this.name = name;
            this.quantity = quantity;
            this.price = price;
        } else if (typeof _name === 'string') {
            this._id = id;
            this.name = _name;
            this.quantity = quantity;
            this.price = price;
        }
    }
}