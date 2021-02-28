import ProductDTO from './../DTO/ProductDTO';
import InterfaceDAO from './../models/InterfaceDAO';
import Connection from './../models/Connection';
import { products } from './../DB'
import * as Datastore from 'nedb';

class ProductDAO extends Connection<Datastore<ProductDTO>> implements InterfaceDAO<ProductDTO> {
    constructor(database: Datastore) {
        super(database);
    }

    public async insert(productDTO: ProductDTO): Promise<ProductDTO> {
        delete productDTO._id;
        return new Promise(resolve =>
            this.connection.insert(productDTO, (err, doc) => {
                if (err) {
                    throw err;
                } else {
                    resolve(new ProductDTO(doc));
                }
            })
        );
    }

    public async insertMany(productsDTO: ProductDTO[]): Promise<ProductDTO[]> {
        productsDTO = productsDTO.map(productDTO => { delete productDTO._id; return productDTO });
        return new Promise(resolve =>
            this.connection.insert(productsDTO, (err, docs) => {
                if (err) {
                    throw err;
                } else {
                    resolve(docs.map(doc => new ProductDTO(doc)));
                }
            })
        );
    }

    public async update(id: string, productDTO: ProductDTO): Promise<boolean> {
        delete productDTO._id;
        return new Promise(resolve =>
            this.connection.update({ _id: id }, { $set: productDTO }, {}, (err, countDocs) => {
                if (err) {
                    throw err;
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
        return new Promise(resolve =>
            this.connection.findOne({ _id: id }, (err, doc) => {
                if (err) throw err;
                resolve(new ProductDTO(doc))
            })
        );
    }

    public async getAll(): Promise<ProductDTO[]> {
        return new Promise(resolve =>
            this.connection.find({}, (err, docs) => {
                if (err) throw err;
                resolve(docs.map(doc => new ProductDTO(doc)))
            })
        );
    }

    public async clearDataBase(): Promise<boolean> {
        return new Promise(resolve =>
            this.connection.remove(
                {},
                { multi: true },
                (err, _) => {
                    if (err) {
                        throw err;
                    } else {
                        resolve(true)
                    }
                }
            )
        );
    }
}

export default new ProductDAO(products);