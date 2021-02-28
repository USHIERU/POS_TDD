import ProductDTO from './ProductDTO'

export default class TicketDTO {
    public _id: string;
    public description: string;
    public waiter: string;
    public products: ProductDTO[];
    public total: number;

    constructor(_description: string | object, waiter?: string, products?: ProductDTO[], id = '') {
        if (typeof _description === 'object') {
            const { _id, description, waiter, products, total } = _description as TicketDTO;
            this._id = _id;
            this.description = description;
            this.waiter = waiter;
            this.products = products;
            this.total = total;
        } else if (typeof _description === 'string') {
            this._id = id;
            this.description = _description;
            this.waiter = waiter;
            this.products = products;
            this.updateTotal();
        }
    }

    addProduct(product: ProductDTO) {
        this.products.push(product);
        this.updateTotal();
    }

    removeProduct(_id: string) {
        this.products = this.products.filter(product => product._id !== _id);
        this.updateTotal();
    }

    updateTotal(): number {
        if (!this.products.length) return this.total = 0;

        this.total = this.products.reduce((prev, current) => {
            current.price = prev.price + current.price
            return current;
        }).price;
    }
}