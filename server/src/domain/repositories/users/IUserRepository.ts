import { UserType } from '../../models/User';
import { IUser } from '../../types';

export default interface IUserRepository {
    create(user: IUser): Promise<UserType>;
    get(id: string): Promise<UserType | null>;
    update(user: IUser, id: string): Promise<UserType | null>;
    delete(id: string): Promise<void>;
    getAll(): Promise<UserType[]>;
    findByEmail(email: string): Promise<UserType | null>;
    findByUsername(username: string): Promise<UserType | null>;
}