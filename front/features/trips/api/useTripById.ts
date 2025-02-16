import { landMarkApi } from "@/features/shared/api";
import { useQuery } from "@tanstack/react-query";

export const getTripById = async (id: string) => {
    const response = await landMarkApi.get(`/trip/${id}`);
    return response.data;
}

function useTripById({ id }: { id: string }) {
    const { data, ...rest } = useQuery({
        queryKey: ['trip', id],
        queryFn: () => getTripById(id),
    });

    const trip = data?.data;

    return { trip, ...rest };
}

export default useTripById