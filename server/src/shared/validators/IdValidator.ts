import { z } from 'zod';
import { Types } from 'mongoose';

const idSchema = z.string().refine((val) => Types.ObjectId.isValid(val), { message: 'Invalid ID', });

export default idSchema;