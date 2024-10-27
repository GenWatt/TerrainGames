import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser, Theme, UserRole } from "../../../shared/types";

const userSchema = new mongoose.Schema<IUser & Document>({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: UserRole.USER,
        enum: [UserRole.ADMIN, UserRole.CREATOR, UserRole.USER],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    googleId: {
        type: String,
    },
    avatar: {
        type: String,
    },
    accessToken: {
        type: String,
    },

    // User prefs

    prefs: {
        theme: {
            type: String,
            default: Theme.LIGHT,
            enum: [Theme.LIGHT, Theme.DARK],
        },
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

export type UserType = mongoose.Document & IUser;

export const User = mongoose.model("User", userSchema);