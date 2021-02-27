import IngredientDTO from './../DTO/IngredientDTO';
import DB from './../DB'
import * as Datastore from 'nedb';

class IngredientDAO {
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

    public async insert(ingredientDTO: IngredientDTO): Promise<IngredientDTO> {
        delete ingredientDTO._id;
        return await new Promise(resolve =>
            this.database.insert(ingredientDTO, (err, doc) => {
                if (err) {
                    resolve(null)
                } else {
                    resolve(new IngredientDTO(doc))
                }
            })
        );
    }

    public async insertMany(ingredientDTO: IngredientDTO[]): Promise<IngredientDTO[]> {
        ingredientDTO = ingredientDTO.map(ingredient => { delete ingredient._id; return ingredient })
        return await new Promise(resolve =>
            this.database.insert(ingredientDTO, (err, docs) => {
                if (err) {
                    resolve(null)
                } else {
                    resolve(docs.map(doc => new IngredientDTO(doc)))
                }
            })
        );
    }

    public async update(id: string, ingredientDTO: IngredientDTO): Promise<boolean> {
        return await new Promise(resolve =>
            this.database.update({ _id: id }, ingredientDTO, {}, (err, countDocs) => {
                if (err) {
                    resolve(false)
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
        return await new Promise(resolve =>
            this.database.findOne({ _id: id }, (err, doc) => {
                if (err) {
                    resolve(null)
                } else {
                    resolve(new IngredientDTO(doc))
                }
            })
        );
    }

    public async getAll(): Promise<IngredientDTO[]> {
        return await new Promise(resolve =>
            this.database.find({}, (err: Error, docs: IngredientDTO[]) => {
                if (err) {
                    resolve(null)
                } else {
                    resolve(docs.map(doc => new IngredientDTO(doc)))
                }
            })
        );
    }

    public async clearDataBase(): Promise<boolean> {
        return await new Promise(resolve =>
            this.database.remove(
                {},
                { multi: true },
                (err, _) => {
                    if (err) {
                        resolve(false)
                    } else {
                        resolve(true)
                    }
                }
            )
        );
    }
}

export default new IngredientDAO(DB.ingredients);