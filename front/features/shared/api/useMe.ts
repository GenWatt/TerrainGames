import { useQuery } from "@tanstack/react-query";
import { IApiResult, IUser, UserRole } from "@/types";
import { AxiosResponse } from "axios";
import { landMarkApi } from ".";
import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";

export const getMe = async (): Promise<AxiosResponse<IUser, IApiResult>> => {
    const response = await landMarkApi.get('/auth/me');
    return response;
}

function useMe() {
    const { login, logout } = useUserStore();
    const { data, isLoading, ...rest } = useQuery({
        queryKey: ['me'],
        queryFn: getMe,
    });

    const hasRoles = (roles: UserRole[]) => {
        const user = data?.data;

        if (!user) {
            return false;
        }

        return roles.includes(user.role);
    }

    useEffect(() => {
        if (isLoading) return;

        if (data?.data) {
            login(data.data);
        } else {
            logout();
        }
    }, [data, isLoading]);

    const user = data?.data;

    return { user, isLoading, hasRoles, ...rest };
}

export default useMe