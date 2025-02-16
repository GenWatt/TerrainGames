import { UserRole } from "@/types";
import { AppModes, useTripStore } from "../stores/TripStore";
import useMe from "../api/useMe";
import { useCreateTripStore } from "../stores/createTripStore";
import { FeatureGroups, IFeatureFlags, ToolbarActionFeatures, OtherFeatures, Feature } from "../types";

const FEATUERS_GROUPS: Record<FeatureGroups, AppModes[]> = {
    [FeatureGroups.EDIT_CREATE_TRIP]: [AppModes.CREATE_TRIP, AppModes.EDIT_TRIP],
    [FeatureGroups.ACTIVE_PAUSE_TRIP]: [AppModes.ACTIVE_TRIP, AppModes.PAUSE_TRIP]
}

const FEATUERS_FLAGS: IFeatureFlags[] = [
    {
        feature: ToolbarActionFeatures.ADD_WAYPOINT,
        modes: [AppModes.VIEW],
        userRoles: [UserRole.ADMIN],
        group: [FeatureGroups.EDIT_CREATE_TRIP]
    },
    {
        feature: ToolbarActionFeatures.FLY_TO
    },
    {
        feature: ToolbarActionFeatures.DELETE_ALL_WAYPOINTS,
        userRoles: [UserRole.ADMIN],
        group: [FeatureGroups.EDIT_CREATE_TRIP],
        minWaypoints: 1
    },
    {
        feature: ToolbarActionFeatures.SAVE_TRIP,
        userRoles: [UserRole.ADMIN],
        group: [FeatureGroups.EDIT_CREATE_TRIP],
        minWaypoints: 2
    },
    {
        feature: OtherFeatures.TRIP_ACTIVE_VIEW,
        group: [FeatureGroups.ACTIVE_PAUSE_TRIP]
    },
    {
        feature: ToolbarActionFeatures.CANCEL_TRIP,
        group: [FeatureGroups.EDIT_CREATE_TRIP]
    },
    {
        feature: OtherFeatures.TRIP_MARKERS,
        modes: [AppModes.VIEW]
    },
    {
        feature: OtherFeatures.FETCH_TRIPS,
        modes: [AppModes.VIEW]
    },
    {
        feature: ToolbarActionFeatures.DRAW_ROAD,
        group: [FeatureGroups.EDIT_CREATE_TRIP],
        minWaypoints: 2
    },
    {
        feature: OtherFeatures.VIEW_WAYPOINT_DETAILS,
        modes: [AppModes.SELECTED_TRIP, AppModes.ACTIVE_TRIP, AppModes.PAUSE_TRIP]
    }
];

function useFeatureFlags() {
    const { user } = useMe();
    const { mode } = useTripStore();
    const { trip } = useCreateTripStore();

    const isInGroup = (featureFlag: IFeatureFlags) => {
        return featureFlag.group && featureFlag.group.some(group => FEATUERS_GROUPS[group].includes(mode));
    }

    const shouldCheckMode = (featureFlag: IFeatureFlags, mode: AppModes) => {
        return featureFlag.modes && featureFlag.modes.includes(mode);
    }

    const hasUserPermission = (featureFlag: IFeatureFlags, role: UserRole) => {
        return !featureFlag.userRoles || featureFlag.userRoles.includes(role);
    }

    const hasMinWaypoints = (featureFlag: IFeatureFlags, waypointsLength: number) => {
        return featureFlag.minWaypoints && waypointsLength < featureFlag.minWaypoints;
    }

    const isFeatureAvailable = (feature: Feature) => {
        const featureFlag = FEATUERS_FLAGS.find(flag => flag.feature === feature);

        if (!featureFlag || !user) return false;

        if (!shouldCheckMode(featureFlag, mode)) {
            if (!isInGroup(featureFlag)) return false;
        }

        if (!hasUserPermission(featureFlag, user.role)) return false;

        if (hasMinWaypoints(featureFlag, trip.waypoints.length)) return false;

        return true;
    }

    return { isFeatureAvailable }
}

export default useFeatureFlags