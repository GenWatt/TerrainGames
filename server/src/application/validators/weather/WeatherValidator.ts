import { z } from "zod";
import { latitudeSchema, longitudeSchema } from "../../../shared/validators/LatLngValidator";

export const WeatherValidator = z.object({
    latitude: latitudeSchema,
    longitude: longitudeSchema
});