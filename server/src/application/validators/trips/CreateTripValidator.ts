import { z } from 'zod';
import { COORDINATES_LENGTH, TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, WAYPOINT_MIN_LENGTH, WAYPOINT_MAX_LENGTH } from '.';

const waypointSchema = z.object({
    position: z.object({
        type: z.literal("Point"),
        coordinates: z.array(z.number()).length(COORDINATES_LENGTH, `Coordinates must have exactly ${COORDINATES_LENGTH} elements`)
    })
});

const tripDetailsSchema = z.object({
    title: z.string().nonempty("Title must be provided").min(TITLE_MIN_LENGTH, `Title must be at least ${TITLE_MIN_LENGTH} characters`).max(TITLE_MAX_LENGTH, `Title must be at most ${TITLE_MAX_LENGTH} characters`),
    description: z.string().optional(),
    country: z.string().nonempty("Country must be provided"),
    city: z.string().optional()
});

const roadSchema = z.object({
    distance: z.number().nonnegative("Distance must be a non-negative number"),
    duration: z.number().nonnegative("Duration must be a non-negative number"),
    geometry: z.object({
        coordinates: z.array(z.array(z.number())).nonempty("Coordinates must be provided"),
        type: z.literal("LineString")
    }).refine(data => data.coordinates.length > 1, {
        message: "Geometry must have at least 2 coordinates",
    })
});

const tripSchema = z.object({
    trip: z.object({
        tripDetails: tripDetailsSchema,
        waypoints: z.array(waypointSchema).min(WAYPOINT_MIN_LENGTH, `Trip must have at least ${WAYPOINT_MIN_LENGTH} waypoints`).max(WAYPOINT_MAX_LENGTH, `Trip must have at most ${WAYPOINT_MAX_LENGTH} waypoints`),
        road: roadSchema
    })
}).refine(data => data !== undefined, {
    message: "Trip object must be provided",
    path: ["trip"]
});

export { tripSchema, waypointSchema, roadSchema };