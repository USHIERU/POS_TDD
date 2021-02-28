import * as Datastore from 'nedb';
import * as Path from 'path';

const getDatabasePath = (name: string) =>
    Path.join(__dirname, 'databases', `${name}.db`);

export const users = new Datastore({ filename: getDatabasePath('users'), timestampData: true, autoload: true });
export const products = new Datastore({ filename: getDatabasePath('products'), timestampData: true, autoload: true });
export const ingredients = new Datastore({ filename: getDatabasePath('ingredients'), timestampData: true, autoload: true });
export const tickets = new Datastore({ filename: getDatabasePath('tickets'), timestampData: true, autoload: true });