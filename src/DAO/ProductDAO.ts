import ProductDTO from './../DTO/ProductDTO';
import DB from './../DB'
import * as Datastore from 'nedb';

class ProductDAO {
    private database: Datastore;

    constructor(database: Datastore) {
        this.database = database;
        Promise.all(
            [
                this.createUniqueKey('name')
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

    public async insert(productDTO: ProductDTO): Promise<ProductDTO> {
        delete productDTO._id;
        return await new Promise(resolve =>
            this.database.insert(productDTO, (err, doc) => {
                if (err) {
                    resolve(null);
                } else {
                    resolve(doc);
                }
            })
        );
    }

    public async insertMany(productsDTO: ProductDTO[]): Promise<ProductDTO[]> {
        productsDTO = productsDTO.map(productDTO => { delete productDTO._id; return productDTO });
        return await new Promise(resolve =>
            this.database.insert(productsDTO, (err, docs) => {
                if (err) {
                    resolve(null);
                } else {
                    resolve(docs);
                }
            })
        );
    }

    public async update(id: string, productDTO: ProductDTO): Promise<boolean> {
        delete productDTO._id;
        return await new Promise(resolve =>
            this.database.update({ _id: id }, { $set: productDTO }, {}, (err, countDocs) => {
                if (err) {
                    resolve(null)
                } else {
                    if (countDocs > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            })
        );
    }

    public async findOne(id: string): Promise<ProductDTO> {
        return await new Promise(resolve =>
            this.database.findOne({ _id: id }, (err, userDTO) => {
                if (err) console.log(err)
                err ? resolve(null) : resolve(userDTO)
            })
        );
    }

    public async getAll(): Promise<ProductDTO[]> {
        return await new Promise(resolve =>
            this.database.find({}, (err, userDTO) => {
                if (err) console.log(err)
                err ? resolve(null) : resolve(userDTO)
            })
        );
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