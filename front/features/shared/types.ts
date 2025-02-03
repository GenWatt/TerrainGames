import { UserRole } from "@/types";
import { AppModes } from "./stores/TripStore";

export enum ToolbarActionFeatures {
    ADD_WAYPOINT = 'ADD_WAYPOINT',
    FLY_TO = 'FLY_TO',
    DELETE_ALL_WAYPOINTS = 'DELETE_ALL_WAYPOINTS',
    SAVE_TRIP = 'SAVE_TRIP',
    CANCEL_TRIP = 'CANCEL_TRIP',
    NONE = 'NONE',
}

export enum OtherFeatures {
    TRIP_ACTIVE_VIEW = 'TRIP_ACTIVE_VIEW',
    TRIP_MARKERS = 'TRIP_MARKERS',
}

export type Feature = ToolbarActionFeatures | OtherFeatures;

export enum FeatureGroups {
    EDIT_CREATE_TRIP = 'EDIT_CREATE_TRIP',
    ACTIVE_PAUSE_TRIP = 'ACTIVE_PAUSE_TRIP'
}

// if modes is null, it means that feature is available in all modes etc.
export interface IFeatureFlags {
    feature: Feature;
    modes?: AppModes[];
    userRoles?: UserRole[];
    group?: FeatureGroups[];
    minWaypoints?: number;
}
