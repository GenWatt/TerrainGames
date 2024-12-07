import { ITrip } from "@/store/createTripStore";
import { landMarkApi } from "."
import { IApiResult } from "@/types";
import { AxiosResponse } from "axios";

export const saveTrip = async (trip: ITrip) => {
    return await landMarkApi.post('/trip', { trip });
}

export const getAllTrips = async (): Promise<AxiosResponse<IApiResult<ITrip[]>, IApiResult>> => {
    return await landMarkApi.get('/trip');
}

export const deleteTrip = async (tripId: string) => {
    return await landMarkApi.delete(`/trip/${tripId}`);
}

export const updateTrip = async (trip: ITrip) => {
    console.log('updateTrip', trip._id);
    return await landMarkApi.put(`/trip/${trip._id}`, { trip });
}