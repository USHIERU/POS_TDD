import * as Datastore from 'nedb';

export default (database: Datastore) => (target: Object, propertyKey: string) => {
    database.ensureIndex(
        { fieldName: propertyKey, unique: true },
        (err) => {
            if (err) {
                new Error(err.message)
            }
        }
    )
};
