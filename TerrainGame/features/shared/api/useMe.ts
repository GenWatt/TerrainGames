import useError from "@/features/shared/hooks/useError";
import { useQuery } from "@tanstack/react-query";
import { IApiResult, IUser, UserRole } from "@/types";
import { AxiosResponse } from "axios";
import { landMarkApi } from ".";

export const getMe = async (): Promise<AxiosResponse<IUser, IApiResult>> => {
    const response = await landMarkApi.get('/auth/me');
    return response;
}

let previousErrorCount = 0;

function useMe() {
    const { handleError } = useError();
    const { data, error, isLoading, errorUpdateCount } = useQuery({ queryKey: ['me'], queryFn: getMe, retry: 0 });

    const hasRoles = (roles: UserRole[]) => {
        const user = data?.data;
        if (!user) {
            return false;
        }

        return roles.includes(user.role);
    }

    if (errorUpdateCount !== previousErrorCount) {
        handleError(error);
        previousErrorCount = errorUpdateCount;
        console.log('me data', errorUpdateCount);
    }

    const user = data?.data;

    return { user, error, isLoading, hasRoles };
}

export default useMe