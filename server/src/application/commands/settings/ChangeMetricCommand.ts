import { MetricTypes } from "@shared/types";
import { ICommand } from "../../types";

export class ChangeMetricCommand implements ICommand {
    constructor(public readonly metric: MetricTypes, public readonly userId?: string) { }
}