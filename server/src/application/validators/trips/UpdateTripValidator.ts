import { z } from 'zod';
import { TITLE_MAX_LENGTH, TITLE_MIN_LENGTH, WAYPOINT_MAX_LENGTH, WAYPOINT_MIN_LENGTH } from '.';
import { Types } from 'mongoose';
import { CoordinatesValidator } from '../../../shared/validators/CoordinatesValidator';

const waypointSchema = z.object({
    id: z.string().refine((val) => Types.ObjectId.isValid(val), { message: 'Invalid waypoint ID', }),
    position: z.object({
        type: z.literal("Point"),
        coordinates: CoordinatesValidator
    })
});

const tripDetailsSchema = z.object({
    title: z.string().nonempty("Title must be provided").min(TITLE_MIN_LENGTH, `Title must be at least ${TITLE_MIN_LENGTH} characters`).max(TITLE_MAX_LENGTH, `Title must be at most ${TITLE_MAX_LENGTH} characters`),
    description: z.string().optional(),
    country: z.string().nonempty("Country must be provided"),
    city: z.string().optional()
});

const tripSchema = z.object({
    tripId: z.string().refine((val) => Types.ObjectId.isValid(val), { message: 'Invalid trip ID', }),
    trip: z.object({
        tripDetails: tripDetailsSchema,
        waypoints: z.array(waypointSchema).min(WAYPOINT_MIN_LENGTH, `Trip must have at least ${WAYPOINT_MIN_LENGTH} waypoints`).max(WAYPOINT_MAX_LENGTH, `Trip must have at most ${WAYPOINT_MAX_LENGTH} waypoints`),
    })
}).refine(data => data !== undefined, {
    message: "Trip object must be provided",
    path: ["trip"]
});

export { tripSchema, waypointSchema };