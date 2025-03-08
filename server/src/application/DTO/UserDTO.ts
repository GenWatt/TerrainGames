import { IUser } from "../../domain/types";
import { UserRole, Theme } from "../../domain/types/enums";

export class UserDTO {
    _id: string;
    username: string;
    email: string;
    role: UserRole;
    googleId?: string;
    avatar?: string;
    accessToken?: string;
    createdAt: Date;
    prefs?: {
        theme?: Theme;
    };

    constructor(user: IUser) {
        this._id = user._id;
        this.username = user.username;
        this.email = user.email;
        this.role = user.role;
        this.googleId = user.googleId;
        this.avatar = user.avatar;
        this.accessToken = user.accessToken;
        this.createdAt = user.createdAt;
        this.prefs = user.prefs;
    }
}