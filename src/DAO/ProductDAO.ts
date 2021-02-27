import ProductDTO from './../DTO/ProductDTO';
import DB from './../DB'
import * as Datastore from 'nedb';

class ProductDAO {
    private database: Datastore;

    constructor(database: Datastore) {
        this.database = database;
        Promise.all(
            [
            ]
        ).then(() => { });
    }

    private async createUniqueKey(fieldName: string): Promise<boolean> {
        return await new Promise(resolve =>
            this.database.ensureIndex(
                { fieldName: fieldName, unique: true },
                (err) => err ? new Error(err.message) : resolve(true)
            )
        );
    }

    public async insert(productDTO: ProductDTO): Promise<boolean> {
        return true;
    }

    public async insertMany(productDTO: ProductDTO[]): Promise<boolean> {
        return true;
    }

    public async update(id: string, productDTO: ProductDTO[]): Promise<boolean> {
        return true;
    }

    public async findOne(id: string): Promise<ProductDTO> {
        return new ProductDTO();
    }

    public async getAll(id: string): Promise<ProductDTO[]> {
        return [new ProductDTO()];
    }

    public async clearDataBase(): Promise<boolean> {
        return await new Promise(resolve =>
            this.database.remove(
                {},
                { multi: true },
                (err, _) => err ? resolve(true) : resolve(false)
            )
        );
    }
}

export default new ProductDAO(DB.products);