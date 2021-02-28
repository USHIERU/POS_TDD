import TicketDTO from './../DTO/TicketDTO';
import InterfaceDAO from './../models/InterfaceDAO';
import Connection from './../models/Connection';
import { tickets } from './../DB'
import * as Datastore from 'nedb';

class TicketDAO extends Connection<Datastore<TicketDTO>> implements InterfaceDAO<TicketDTO> {
    constructor(connection: Datastore) {
        super(connection);
    }

    insert(DTO: TicketDTO): Promise<TicketDTO> {
        delete DTO._id;
        return new Promise(resolve =>
            this.connection.insert(DTO, (err, doc) => {
                if (err) throw err;
                resolve(new TicketDTO(doc))
            })
        );
    }

    insertMany(DTO: TicketDTO[]): Promise<TicketDTO[]> {
        DTO = DTO.map(dto => { delete dto._id; return dto; });
        return new Promise(resolve =>
            this.connection.insert(DTO, (err, docs) => {
                if (err) throw err;
                resolve(docs.map(doc => new TicketDTO(doc)))
            })
        );
    }

    update(id: string, DTO: TicketDTO): Promise<boolean> {
        delete DTO._id;
        return new Promise(resolve =>
            this.connection.update({ _id: id }, { $set: DTO }, {}, (err, countDocs) => {
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

    findOne(id: string): Promise<TicketDTO> {
        return new Promise(resolve =>
            this.connection.findOne({ _id: id }, (err, doc) => {
                if (err) throw err;
                resolve(new TicketDTO(doc))
            })
        );
    }

    getAll(): Promise<TicketDTO[]> {
        return new Promise(resolve =>
            this.connection.find({}, (err, docs) => {
                if (err) throw err;
                resolve(docs.map(doc => new TicketDTO(doc)))
            })
        );
    }

    clearDataBase(): Promise<boolean> {
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

export default new TicketDAO(tickets);