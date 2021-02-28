import UserDTO from './../DTO/UserDTO';
import InterfaceDAO from './../models/InterfaceDAO';
import Connection from './../models/Connection';
import DB from './../DB';
import * as Datastore from 'nedb';

class UserDAO extends Connection<Datastore<UserDTO>> implements InterfaceDAO<UserDTO>{
    constructor(database: Datastore) {
        super(database);
        Promise.all(
            [
                this.createUniqueKey('user'),
                this.createUniqueKey('password')
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

    public async insert(userDTO: UserDTO): Promise<UserDTO> {
        delete userDTO._id;
        return await new Promise(resolve =>
            this.connection.insert(userDTO, (err, doc) => {
                if (err) {
                    resolve(null);
                } else {
                    resolve(new UserDTO(doc));
                }
            })
        );
    }

    public async insertMany(usersDTO: UserDTO[]): Promise<UserDTO[]> {
        usersDTO = usersDTO.map(userDTO => { delete userDTO._id; return userDTO });
        return await new Promise(resolve =>
            this.connection.insert(usersDTO, (err, docs) => {
                if (err) {
                    resolve(null);
                } else {
                    resolve(docs.map(doc => new UserDTO(doc)));
                }
            })
        );
    }

    public async update(id: string, userDTO: UserDTO): Promise<boolean> {
        delete userDTO._id
        return await new Promise(resolve =>
            this.connection.update({ _id: id }, { $set: userDTO }, {}, (err, countDocs) => {
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

    public async findOne(id: string): Promise<UserDTO> {
        return await new Promise(resolve =>
            this.connection.findOne({ _id: id }, (err, doc) => {
                if (err) console.log(err)
                err ? resolve(null) : resolve(new UserDTO(doc))
            })
        );
    }

    public async getAll(): Promise<UserDTO[]> {
        return await new Promise(resolve =>
            this.connection.find({}, (err, docs) => {
                if (err) console.log(err)
                err ? resolve(null) : resolve(docs.map(doc => new UserDTO(doc)))
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

export default new UserDAO(DB.users);