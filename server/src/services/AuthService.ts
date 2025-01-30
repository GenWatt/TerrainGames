import { IUser } from "../../../shared/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthService {
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