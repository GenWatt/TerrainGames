import * as path from 'path';
import fs from 'fs';
import { ICommand, IHandler, IResult } from './types';
import { container } from '../shared/DIContainer';

export interface IMediator {
    send<T>(command: ICommand): Promise<IResult<T | null>>;
}

export default class Mediator implements IMediator {
    private handlers = new Map<ICommand, IHandler>();

    constructor() {
        console.log('Mediator constructor');
        const handlerPath = path.join(__dirname, 'handlers');
        const commandPath = path.join(__dirname, 'commands');
        const queryPath = path.join(__dirname, 'queries');

        this.loadCQRS(handlerPath, commandPath, queryPath);
        console.log('Handlers', this.handlers);
    }

    private loadCQRS(handlerPath: string, commandPath: string, queryPath: string) {
        const files = fs.readdirSync(handlerPath);

        for (const file of files) {
            const fullPath = path.join(handlerPath, file);
            if (fs.lstatSync(fullPath).isDirectory()) {
                this.loadCQRS(fullPath, path.join(commandPath, file), path.join(queryPath, file));
            } else {
                const handlerModule = require(fullPath);
                const handlerClass = Object.values(handlerModule)[0];

                const dependencies = container.resolveDependencies(handlerClass);
                console.log('Dependencies', handlerClass);
                const handlerInstance = new (handlerClass as any)(...dependencies);

                let keyModule;
                try {
                    keyModule = require(path.join(commandPath, file.replace('Handler', 'Command')));
                } catch {
                    try {
                        keyModule = require(path.join(queryPath, file.replace('Handler', 'Query')));
                    } catch {
                        console.error(`No corresponding command or query found for handler: ${file}`);
                    }
                }

                const keyClass = Object.values(keyModule)[0] as ICommand;
                this.handlers.set(keyClass, handlerInstance);
            }
        }
    }

    async send<T>(command: ICommand): Promise<IResult<T | null>> {
        const handler = this.handlers.get(command.constructor);

        if (handler) {
            return await handler.handle(command);
        }

        throw new Error('No handler found for this command');
    }
};