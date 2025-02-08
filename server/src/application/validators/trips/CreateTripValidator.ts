import { z } from 'zod';

const COORDINATES_LENGTH = 2;

const waypointSchema = z.object({
    _id: z.string(),
    position: z.object({
        type: z.literal("Point"),
        coordinates: z.array(z.number()).length(COORDINATES_LENGTH)
    })
});

const TITLE_MIN_LENGTH = 3;
const TITLE_MAX_LENGTH = 80;
const WAYPOINT_MIN_LENGTH = 2;
const WAYPOINT_MAX_LENGTH = 25;

const tripSchema = z.object({
    title: z.string().nonempty("Title must be provided").min(TITLE_MIN_LENGTH, `Title must be at least ${TITLE_MIN_LENGTH} characters`).max(TITLE_MAX_LENGTH, `Title must be at most ${TITLE_MAX_LENGTH} characters`),
    country: z.string().nonempty("Country must be provided"),
    waypoints: z.array(waypointSchema).min(WAYPOINT_MIN_LENGTH, `Trip must have at least ${WAYPOINT_MIN_LENGTH} waypoints`).max(WAYPOINT_MAX_LENGTH, `Trip must have at most ${WAYPOINT_MAX_LENGTH} waypoints`),
});

export { tripSchema, waypointSchema };