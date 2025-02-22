import { QueryCache, QueryClient } from "@tanstack/react-query";
import { handleErrorFunction } from "../hooks/useError";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: 2,
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        },
        mutations: {
            onError: handleErrorFunction,
        },
    },
    queryCache: new QueryCache({
        onError: handleErrorFunction,
    })
});
