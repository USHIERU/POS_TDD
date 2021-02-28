interface InterfaceDAO<T = any> {
    insert(DTO: T): Promise<T>;
    insertMany(DTO: T[]): Promise<T[]>;
    update(id: string, DTO: T): Promise<boolean>;
    findOne(id: string): Promise<T>;
    getAll(): Promise<T[]>;
    clearDataBase(): Promise<boolean>;
}

export default InterfaceDAO;