import { z } from 'zod';

const PASSWORD_MIN_LENGTH = 4;
const USERNAME_MIN_LENGTH = 3;

export const CreateAdminValidator = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(4, `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`),
    username: z.string().min(3, `Username must be at least ${USERNAME_MIN_LENGTH} characters long`),
});