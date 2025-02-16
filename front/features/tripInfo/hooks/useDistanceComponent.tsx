import useMe from '@/features/shared/api/useMe';
import useConverter, { MetricUnit } from '@/features/shared/hooks/useConverter';
import { MapboxRoadType } from '@/features/shared/stores/createTripStore';
import { useMemo } from 'react';

export interface DistanceHookProps {
    road: MapboxRoadType;
}

function useDistanceComponent({ road }: DistanceHookProps) {
    const { formatDistanceString, convertDistance } = useConverter();
    const { user } = useMe();

    const convertedDistance = useMemo(() => {
        return convertDistance({ value: road.distance, unit: MetricUnit.METER });
    }, [road.distance, user?.prefs]);

    const totalDistance = useMemo(() =>
        formatDistanceString(convertedDistance)
        , [convertedDistance]);

    return {
        totalDistance
    }
}

export default useDistanceComponent