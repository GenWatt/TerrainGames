import useError from "@/hooks/useError";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../auth";

function useMe() {
    const { handleError } = useError();
    const { data, error, isLoading } = useQuery({ queryKey: ['me'], queryFn: getMe, retry: 0 });

    handleError(error);

    if (!data) {
        return { user: null, error, isLoading };
    }

    return { user: data.data.data, error, isLoading };
}

export default useMe