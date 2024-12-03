import useAuth from "@/hooks/useAuth"
import { UserRole } from "@/types"

export interface WithRolesProps {
    roles: UserRole[]
    children: React.ReactNode
}

function WithRoles({ roles, children }: WithRolesProps) {
    const { hasRoles } = useAuth()

    return (
        <>
            {hasRoles(roles) && children}
        </>
    )
}

export default WithRoles