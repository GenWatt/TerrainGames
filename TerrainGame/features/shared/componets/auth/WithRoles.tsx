import useMe from "@/api/queries/useMe"
import { UserRole } from "@/types"

export interface WithRolesProps {
    roles: UserRole[]
    children: React.ReactNode
}

function WithRoles({ roles, children }: WithRolesProps) {
    const { hasRoles } = useMe()

    return (
        <>
            {hasRoles(roles) && children}
        </>
    )
}

export default WithRoles