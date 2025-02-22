import { ICommand } from "../../types";
import { Position } from "../../../domain/types";

export class DrawRoadCommand implements ICommand {
    constructor(public readonly waypoints: Position[]) { }
}