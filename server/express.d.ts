import { IUser } from '../shared/types/index'; // Adjust the import path as needed

declare global {
    namespace Express {
        interface Request {
            // logout(): void;
            user?: IUser;
        }
    }
}