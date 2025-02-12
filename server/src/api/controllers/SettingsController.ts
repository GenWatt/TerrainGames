import { NextFunction, Response, Request } from "express";
import { IMediator } from "../../application/Mediator";
import { ChangeMetricCommand } from "../../application/commands/settings/ChangeMetricCommand";
import { IUser } from "@shared/types";
import { ChangeTemperatureUnitCommand } from "../../application/commands/settings/ChangeTemperatureUnitCommand";

class SettingsController {
    constructor(private mediator: IMediator) { }

    public async changeMetric(req: Request, res: Response, next: NextFunction) {
        const { metric } = req.body;
        const result = await this.mediator.send(new ChangeMetricCommand(metric, ((req.user) as IUser)?._id.toString() as string));

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result);
    }

    public async changeTemperatureUnit(req: Request, res: Response, next: NextFunction) {
        const { unit } = req.body;
        const result = await this.mediator.send(new ChangeTemperatureUnitCommand(unit, ((req.user) as IUser)?._id.toString() as string));

        if (result.isSuccess) {
            return res.status(result.statusCode).json(result);
        }

        next(result);
    }
}

export default SettingsController;