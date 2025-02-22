import { landMarkApi } from "@/features/shared/api";
import { WeatherData, IApiResult } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const fetchWeather = async ({ latitude, longitude }: { latitude: number, longitude: number }): Promise<AxiosResponse<IApiResult<WeatherData>, IApiResult>> => {
    return await landMarkApi.get(`/weather/${latitude},${longitude}`);
}

function useQueryWeather({ latitude, longitude }: { latitude: number, longitude: number }) {
    const { data, ...rest } = useQuery({
        queryKey: ['weather', { latitude, longitude }],
        queryFn: () => fetchWeather({ latitude, longitude }),
        refetchInterval: 60 * 60 * 1000,
    });

    const weatherData = data?.data.data;

    return { weatherData, ...rest };
}

export default useQueryWeather;