import * as path from 'path';
import fs from 'fs';
import { ICommand, IHandler, IResult } from './types';
import { container } from 'tsyringe';

export interface IMediator {
    send<T>(command: ICommand): Promise<IResult<T | null>>;
}

export default class Mediator implements IMediator {
    private handlers = new Map<new (...args: any[]) => ICommand | null, IHandler>();

    constructor() {
        const handlerPath = path.join(__dirname, 'handlers');
        console.log(`Loading handlers from ${handlerPath}`);
        this.loadHandlers(handlerPath);
    }

    private loadHandlers(handlersDir: string) {
        const items = fs.readdirSync(handlersDir);

        for (const item of items) {
            const fullPath = path.join(handlersDir, item);
            const isDirectory = fs.lstatSync(fullPath).isDirectory();

            if (isDirectory) {
                this.loadHandlers(fullPath);
            } else if (item.endsWith('.ts') || item.endsWith('.js')) {
                this.registerHandler(fullPath);
            }
        }
    }

    private registerHandler(handlerFilePath: string) {
        const handlerModule = require(handlerFilePath);
        const HandlerClass = Object.values(handlerModule)
            .find((v) => typeof v === 'function' && v.prototype.handle) as new (...args: any[]) => IHandler;

        if (!HandlerClass) return;

        container.register(HandlerClass, { useClass: HandlerClass });

        const relativePath = path.relative(path.join(__dirname, 'handlers'), handlerFilePath);

        const commandQueryClass = this.findCommandQueryClass(relativePath);
        if (!commandQueryClass) return;

        const handlerInstance = container.resolve(HandlerClass);

        this.handlers.set(commandQueryClass, handlerInstance);
    }

    private findCommandQueryClass(relativeHandlerPath: string): (new (...args: any[]) => ICommand) | null {
        const baseName = path.basename(relativeHandlerPath).replace(/Handler\.[tj]s$/, '');
        const directory = path.dirname(relativeHandlerPath);
        const fileExtension = path.extname(relativeHandlerPath);

        const commandPath = path.join(__dirname, 'commands', directory, `${baseName}Command${fileExtension}`);
        console.log(`Looking for command at ${commandPath}`);
        try {
            return require(commandPath)[`${baseName}Command`];
        } catch {
            const queryPath = path.join(__dirname, 'queries', directory, `${baseName}Query${fileExtension}`);
            try {
                return require(queryPath)[`${baseName}Query`];
            } catch {
                console.error(`No corresponding command/query found for handler: ${relativeHandlerPath}`);
                return null;
            }
        }
    }

    async send<T>(command: ICommand): Promise<IResult<T | null>> {
        const handler = this.handlers.get(command.constructor as new (...args: any[]) => ICommand);

        if (!handler) {
            throw new Error(`No handler registered for ${command.constructor.name}`);
        }

        return handler.handle(command) as Promise<IResult<T | null>>;
    }
}