import useError from "@/hooks/useError";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../auth";
import { UserRole } from "@/types";

function useMe() {
    const { handleError } = useError();
    const { data, error, isLoading } = useQuery({ queryKey: ['me'], queryFn: getMe, retry: 0 });

    const hasRoles = (roles: UserRole[]) => {
        const user = data?.data;
        if (!user) {
            return false;
        }
        console.log('user', user);
        return roles.includes(user.role);
    }

    handleError(error);

    const user = data?.data;

    return { user, error, isLoading, hasRoles };
}

export default useMe