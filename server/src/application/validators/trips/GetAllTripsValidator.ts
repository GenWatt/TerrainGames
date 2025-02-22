import { z } from 'zod';
import { latitudeSchema, longitudeSchema } from '../../../shared/validators/LatLngValidator';

const getAllTripsValidator = z.object({
    neLat: latitudeSchema,
    neLng: longitudeSchema,
    swLat: latitudeSchema,
    swLng: longitudeSchema
});

export { getAllTripsValidator };