import { MetricType } from "@/types";
import useMe from "../api/useMe";

export enum MetricUnit {
    KILOMETER = "km",
    METER = "m",
    MILE = "mi",
    FOOT = "ft"
}

export type Metric = {
    unit: MetricUnit;
    value: number;
};

const MILE_TO_KILOMETER = 1.609;
const FOOT_TO_METER = 0.3048;
const MILE_TO_METER = 1609.34;
const KILOMETER_TO_METER = 1000;
const FOOT_TO_MILE = 5280;

class DistanceConverter {
    private userPrefs = useMe().user?.prefs.metricSystem;

    private isMetricPreferred(): boolean {
        return this.userPrefs === MetricType.METRIC;
    }

    public convert(metric: Metric): Metric {
        if (this.isMetricPreferred()) {
            return this.convertToMetric(metric);
        } else {
            return this.convertToImperial(metric);
        }
    }

    private convertToMetric(metric: Metric): Metric {
        switch (metric.unit) {
            case MetricUnit.MILE:
                return { value: metric.value * MILE_TO_KILOMETER, unit: MetricUnit.KILOMETER };
            case MetricUnit.FOOT:
                return { value: metric.value * FOOT_TO_METER, unit: MetricUnit.METER };
            default:
                return metric;
        }
    }

    private convertToImperial(metric: Metric): Metric {
        switch (metric.unit) {
            case MetricUnit.KILOMETER:
                return { value: metric.value / MILE_TO_KILOMETER, unit: MetricUnit.MILE };
            case MetricUnit.METER:
                return metric.value >= MILE_TO_METER
                    ? { value: metric.value / MILE_TO_METER, unit: MetricUnit.MILE }
                    : { value: metric.value / FOOT_TO_METER, unit: MetricUnit.FOOT };
            default:
                return metric;
        }
    }

    public format(metric: Metric): Metric {
        if (metric.unit === MetricUnit.METER && metric.value > KILOMETER_TO_METER) {
            return { value: metric.value / KILOMETER_TO_METER, unit: MetricUnit.KILOMETER };
        }
        if (metric.unit === MetricUnit.FOOT && metric.value > FOOT_TO_MILE) {
            return { value: metric.value / FOOT_TO_MILE, unit: MetricUnit.MILE };
        }
        return metric;
    }

    public formatString(metric: Metric): string {
        const formattedMetric = this.format(metric);
        return `${formattedMetric.value.toFixed()} ${formattedMetric.unit}`;
    }
}

function useConverter() {
    const converter = new DistanceConverter();
    return {
        convertDistance: (metric: Metric) => converter.convert(metric),
        formatDistance: (metric: Metric) => converter.format(metric),
        formatDistanceString: (metric: Metric) => converter.formatString(metric)
    };
}

export default useConverter;
