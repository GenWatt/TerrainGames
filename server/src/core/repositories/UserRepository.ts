import { User, UserType } from "../../domain/models/User";
import IUserRepository from "../../domain/repositories/users/IUserRepository";
import { IUser } from "../../domain/types";

export default class UserRepository implements IUserRepository {
    async create(user: IUser): Promise<UserType> {
        return await User.create(user);
    }

    async get(id: string): Promise<UserType | null> {
        return await User.findById(id);
    }

    async update(user: IUser, id: string): Promise<UserType | null> {
        return await User.findByIdAndUpdate(id, user, { new: true });
    }

    async delete(id: string): Promise<void> {
        await User.findByIdAndDelete(id);
    }

    async getAll(): Promise<UserType[]> {
        return await User.find();
    }

    async findByEmail(email: string): Promise<UserType | null> {
        return await User.findOne({ email });
    }

    async findByUsername(username: string): Promise<UserType | null> {
        return await User.findOne({ username });
    }
}