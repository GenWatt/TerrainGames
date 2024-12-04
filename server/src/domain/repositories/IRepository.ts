export default interface IRepository<T> {
    create(entity: T): Promise<T>;
    get(id: string): Promise<T | null>;
    update(entity: T, id: string): Promise<T | null>;
    delete(id: string): Promise<void>;
    getAll(): Promise<T[]>;
}