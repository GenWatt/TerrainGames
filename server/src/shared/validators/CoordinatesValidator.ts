import { z } from "zod";
import { latitudeSchema, longitudeSchema } from "./LatLngValidator";

export const CoordinatesValidator = z.tuple([latitudeSchema, longitudeSchema])
