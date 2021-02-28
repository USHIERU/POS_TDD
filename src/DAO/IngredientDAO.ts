import IngredientDTO from './../DTO/IngredientDTO';
import InterfaceDAO from './../models/InterfaceDAO';
import Connection from './../models/Connection';
import { ingredients } from './../DB'
import * as Datastore from 'nedb';

class IngredientDAO extends Connection<Datastore<IngredientDTO>> implements InterfaceDAO<IngredientDTO> {
    constructor(connection: Datastore) {
        super(connection);
    }

    public async insert(ingredientDTO: IngredientDTO): Promise<IngredientDTO> {
        delete ingredientDTO._id;
        return new Promise(resolve =>
            this.connection.insert(ingredientDTO, (err, doc) => {
                if (err) {
                    throw err;
                } else {
                    resolve(new IngredientDTO(doc))
                }
            })
        );
    }

    public async insertMany(ingredientDTO: IngredientDTO[]): Promise<IngredientDTO[]> {
        ingredientDTO = ingredientDTO.map(ingredient => { delete ingredient._id; return ingredient })
        return new Promise(resolve =>
            this.connection.insert(ingredientDTO, (err, docs) => {
                if (err) {
                    throw err;
                } else {
                    resolve(docs.map(doc => new IngredientDTO(doc)))
                }
            })
        );
    }

    public async update(id: string, ingredientDTO: IngredientDTO): Promise<boolean> {
        return new Promise(resolve =>
            this.connection.update({ _id: id }, ingredientDTO, {}, (err, countDocs) => {
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

    public async findOne(id: string): Promise<IngredientDTO> {
        return new Promise(resolve =>
            this.connection.findOne({ _id: id }, (err, doc) => {
                if (err) {
                    throw err;
                } else {
                    resolve(new IngredientDTO(doc))
                }
            })
        );
    }

    public async getAll(): Promise<IngredientDTO[]> {
        return new Promise(resolve =>
            this.connection.find({}, (err: Error, docs: IngredientDTO[]) => {
                if (err) {
                    throw err;
                } else {
                    resolve(docs.map(doc => new IngredientDTO(doc)))
                }
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

export default new IngredientDAO(ingredients);