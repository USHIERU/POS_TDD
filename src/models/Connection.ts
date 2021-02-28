abstract class Connection<T = any> {
    protected connection: T;

    constructor(connection: T) {
        this.connection = connection;
    }
}

export default Connection;