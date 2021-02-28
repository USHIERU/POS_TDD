import ProductDTO from './../DTO/ProductDTO';
import InterfaceDAO from './../models/InterfaceDAO';
import Connection from './../models/Connection';
import DB from './../DB'
import * as Datastore from 'nedb';

class ProductDAO extends Connection<Datastore<ProductDTO>> implements InterfaceDAO<ProductDTO> {
    constructor(database: Datastore) {
        super(database);
        Promise.all(
            [
                this.createUniqueKey('name')
            ]
        ).then(() => { });
    }

    private async createUniqueKey(fieldName: string): Promise<boolean> {
        return await new Promise(resolve =>
            this.connection.ensureIndex(
                { fieldName: fieldName, unique: true },
                (err) => err ? new Error(err.message) : resolve(true)
            )
        );
    }

    public async insert(productDTO: ProductDTO): Promise<ProductDTO> {
        delete productDTO._id;
        return await new Promise(resolve =>
            this.connection.insert(productDTO, (err, doc) => {
                if (err) {
                    resolve(null);
                } else {
                    resolve(new ProductDTO(doc));
                }
            })
        );
    }

    public async insertMany(productsDTO: ProductDTO[]): Promise<ProductDTO[]> {
        productsDTO = productsDTO.map(productDTO => { delete productDTO._id; return productDTO });
        return await new Promise(resolve =>
            this.connection.insert(productsDTO, (err, docs) => {
                if (err) {
                    resolve(null);
                } else {
                    resolve(docs.map(doc => new ProductDTO(doc)));
                }
            })
        );
    }

    public async update(id: string, productDTO: ProductDTO): Promise<boolean> {
        delete productDTO._id;
        return await new Promise(resolve =>
            this.connection.update({ _id: id }, { $set: productDTO }, {}, (err, countDocs) => {
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
            this.connection.findOne({ _id: id }, (err, doc) => {
                if (err) console.log(err)
                err ? resolve(null) : resolve(new ProductDTO(doc))
            })
        );
    }

    public async getAll(): Promise<ProductDTO[]> {
        return await new Promise(resolve =>
            this.connection.find({}, (err, docs) => {
                if (err) console.log(err)
                err ? resolve(null) : resolve(docs.map(doc => new ProductDTO(doc)))
            })
        );
    }

    public async clearDataBase(): Promise<boolean> {
        return await new Promise(resolve =>
            this.connection.remove(
                {},
                { multi: true },
                (err, _) => err ? resolve(true) : resolve(false)
            )
        );
    }
}

export default new ProductDAO(DB.products);