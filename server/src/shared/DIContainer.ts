import fs from 'fs';
import path from 'path';

class DIContainer {
    private services = new Map<string, Object>();
    private excludeServices = ['command'];

    register<T extends Object>(key: string, service: T) {
        this.services.set(key, service);
    }

    resolve<T extends Object>(key: string): T {
        console.log('Key', key, this.services);
        const service = this.services.get(key);

        if (!service) {
            throw new Error(`Service ${key} not found`);
        }

        return service as T;
    }

    registerControllers(controllerPath: string) {
        const files = fs.readdirSync(controllerPath);

        for (const file of files) {
            const fullPath = path.join(controllerPath, file);
            if (fs.lstatSync(fullPath).isDirectory()) {
                this.registerControllers(fullPath); // Recursively register controllers from subdirectories
            } else if (file.endsWith('Controller.ts') || file.endsWith('Controller.js')) {
                const controllerModule = require(fullPath);
                const controllerClass: any = Object.values(controllerModule)[0];
                const controllerName = controllerClass.name;
                const dependencies = this.resolveDependencies(controllerClass);
                this.register(controllerName, new controllerClass(...dependencies));
            }
        }
    }

    resolveDependencies(target: any): any[] {
        // Manually map the dependencies based on the constructor parameter names
        const paramNames = this.getParamNames(target);
        return paramNames.map(name => this.resolve(name));
    }

    private getParamNames(func: Function): string[] {
        const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const ARGUMENT_NAMES = /([^\s,]+)/g;
        const fnStr = func.toString().replace(STRIP_COMMENTS, '');
        const result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

        return result === null ? [] : result
            .filter((service) => !this.excludeServices.includes(service))
            .map((service) => service.charAt(0).toUpperCase() + service.slice(1));
    }
}

export const container = new DIContainer();