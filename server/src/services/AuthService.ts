import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "../domain/types";

export interface IAuthService {
    generateToken(user: IUser): string;
    verifyPassword(password: string, hash: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}

class AuthService implements IAuthService {
    public generateToken(user: IUser): string {
        return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    }

    public verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    public hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export default AuthService;