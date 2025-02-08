import useMe from "@/features/shared/api/useMe"
import useChangeMetricMutation from "../api/useChangeMetricMutation"
import useAuth from "@/features/shared/hooks/useAuth";
import { MetricType } from "@/types";

function useSettings() {
    const { changeMetricAsync } = useChangeMetricMutation()
    const { user, isFetching } = useMe()
    const { logoutAsync } = useAuth();

    const changeMetric = async () => {
        const newMetric = user?.prefs.metricSystem === MetricType.IMPERIAL ? MetricType.METRIC : MetricType.IMPERIAL
        await changeMetricAsync(newMetric)
    }

    return { changeMetric, user, logoutAsync, isFetching }
}

export default useSettings