import { z } from 'zod';
import { Types } from 'mongoose';
import { Temperature } from '../../../domain/types/enums';

export const ChangeTemperatureUnitValidator = z.object({
    userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid user ID',
    }),
    unit: z.enum([Temperature.CELSIUS, Temperature.FAHRENHEIT], {
        errorMap: () => ({ message: 'Temperature unit must be either CELSIUS or FAHRENHEIT' }),
    }),
});