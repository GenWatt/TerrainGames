import { User, UserType } from "../models/User";
import { UserRole } from "../../../shared/types";
import GoogleService from "./GoogleService";
import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export enum ResultTypes {
    ALREADY_EXISTS = 'ALREADY_EXISTS',
    CREATED = 'CREATED',
    NOT_AUTHORIZED = 'NOT_AUTHORIZED',
    TOKEN_NOT_PROVIDED = "TOKEN_NOT_PROVIDED",
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
}

export class Result<T = undefined> {
    type: ResultTypes;
    message: string;
    statusCode: number;
    data?: T;

    constructor(type: ResultTypes, message: string, statusCode: number, data?: T) {
        this.type = type;
        this.message = message;
        this.statusCode = statusCode
        this.data = data;
    }

    isError(): boolean {
        return this.statusCode >= 400;
    }
}

class AuthService {
    private googleService: GoogleService;

    constructor() {
        this.googleService = new GoogleService();
    }

    async createAdmin(): Promise<Result> {
        const savedAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });

        if (savedAdmin) {
            return new Result(ResultTypes.ALREADY_EXISTS, 'Admin already exists', 400);
        }

        const admin = new User({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: UserRole.ADMIN,
            username: 'Adminek',
        });

        await admin.save();

        return new Result(ResultTypes.CREATED, 'Admin created', 201);
    }

    async register(token: string): Promise<Result<UserType>> {
        if (!token) {
            return new Result(ResultTypes.TOKEN_NOT_PROVIDED, 'Token is required', 400);
        }

        const payload = await this.googleService.verifyGoogleToken(token);

        if (!payload) {
            return new Result(ResultTypes.NOT_AUTHORIZED, 'Token is invalid. User not authorized.', 400);
        }

        const { email, sub, name } = payload;

        let user = await User.findOne({ email }, { password: 0 });

        if (!user) {
            user = new User({
                email,
                googleId: sub,
                username: name,
                accessToken: token,
            });

            await user.save();
        }

        return new Result(ResultTypes.CREATED, 'User authenticated', 201, user);
    }

    async registerUser(data: { username: string; email: string; password: string }): Promise<Result<UserType | undefined>> {
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });

        const { error } = schema.validate(data);
        if (error) {
            return new Result(ResultTypes.VALIDATION_ERROR, error.details[0].message, 400, undefined);
        }

        const { username, email, password } = data;

        let user = await User.findOne({ email });
        if (user) {
            return new Result(ResultTypes.ALREADY_EXISTS, 'User already exists', 400);
        }

        user = new User({
            username,
            email,
            password,
            role: UserRole.USER,
        });

        await user.save();

        return new Result(ResultTypes.CREATED, 'User registered', 201);
    }

    async login(data: { username: string; password: string }): Promise<Result<UserType>> {
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        });
        console.log('data', data);
        const { error } = schema.validate(data);
        if (error) {
            return new Result(ResultTypes.NOT_AUTHORIZED, error.details[0].message, 400);
        }

        console.log('data', data);
        const { username, password } = data;

        const user = await User.findOne({ username });
        console.log('user', user);
        if (!user) {
            return new Result(ResultTypes.INVALID_CREDENTIALS, 'Invalid email or password', 400);
        }
        console.log('user', user);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Result(ResultTypes.INVALID_CREDENTIALS, 'Invalid email or password', 400);
        }

        const token = this.generateToken(user);

        user.accessToken = token;
        await user.save();

        return new Result(ResultTypes.CREATED, 'User logged in', 200, user);
    }

    private generateToken(user: UserType): string {
        return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    }
}

export default AuthService;