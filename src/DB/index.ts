import * as Datastore from 'nedb';
import * as Path from 'path';

const getDatabasePath = (name: string) =>
    Path.join(__dirname, 'databases', `${name}.db`);

const databases = {
    users: new Datastore({ filename: getDatabasePath('users'), timestampData: true, autoload: true }),
    products: new Datastore({ filename: getDatabasePath('products'), timestampData: true, autoload: true }),
    ingredients: new Datastore({ filename: getDatabasePath('ingredients'), timestampData: true, autoload: true }),
};

export default databases;