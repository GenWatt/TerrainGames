import { ITrip } from "@/store/createTripStore";
import { landMarkApi } from "."
import { IApiResult } from "@/types";
import { AxiosResponse } from "axios";

export const saveTrip = async (trip: ITrip) => {
    return await landMarkApi.post('/trip', { trip });
}

export const getAllTrips = async (): Promise<AxiosResponse<ITrip[], IApiResult>> => {
    return await landMarkApi.get('/trip');
}