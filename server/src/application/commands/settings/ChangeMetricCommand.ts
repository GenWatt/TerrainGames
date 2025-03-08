import { MetricTypes } from "../../../domain/types/enums";
import { ICommand } from "../../types";

export class ChangeMetricCommand implements ICommand {
    constructor(public readonly metric: MetricTypes, public readonly userId?: string) { }
}