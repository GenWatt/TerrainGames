import { useQuery } from "@tanstack/react-query";
import { IApiResult, IUser, UserRole } from "@/types";
import { AxiosResponse } from "axios";
import { landMarkApi } from ".";

export const getMe = async (): Promise<AxiosResponse<IUser, IApiResult>> => {
    console.log('getMe');
    const response = await landMarkApi.get('/auth/me');
    return response;
}

function useMe() {
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ['me'],
        queryFn: getMe,
        retry: 0,
    });

    const hasRoles = (roles: UserRole[]) => {
        const user = data?.data;

        if (!user) {
            return false;
        }

        return roles.includes(user.role);
    }

    const user = data?.data;

    return { user, isLoading, hasRoles, ...rest };
}

export default useMe