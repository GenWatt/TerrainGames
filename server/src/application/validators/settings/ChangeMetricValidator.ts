import { z } from 'zod';
import { Types } from 'mongoose';

export const ChangeMetricValidator = z.object({
    userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid user ID',
    }),
    metric: z.enum(['METRIC', 'IMPERIAL'], {
        errorMap: () => ({ message: 'Metric must be either METRIC or IMPERIAL' }),
    }),
});