import * as path from 'path';
import fs from 'fs';
import { ICommand, IHandler } from './types';
import { container } from '../shared/DIContainer';

export interface IMediator {
    send(command: ICommand): Promise<any>;
}

export default class Mediator implements IMediator {
    private handlers = new Map<ICommand, IHandler>();
    private excludeServices = ['command'];

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
                console.log('Dependencies', dependencies);
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

    private resolveDependencies(handlerClass: any): any[] {
        // Assuming the constructor parameter names match the registered service names
        const paramNames = this.getParamNames(handlerClass);
        console.log('ParamNames', paramNames);
        return paramNames.map(name => container.resolve(name));
    }

    private getParamNames(func: Function): string[] {
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const ARGUMENT_NAMES = /([^\s,]+)/g;
        const fnStr = func.toString().replace(STRIP_COMMENTS, '');
        const result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

        return result === null ? [] : result
            .filter((service) => !this.excludeServices.includes(service))
            .map((service) => service.charAt(0).toUpperCase() + service.slice(1));;
    }

    async send(command: ICommand) {
        const handler = this.handlers.get(command.constructor);

        if (handler) {
            return await handler.handle(command);
        }

        throw new Error('No handler found for this command');
    }
};