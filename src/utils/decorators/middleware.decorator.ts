import { RequestHandler } from 'express';
import 'reflect-metadata';

const MIDDLEWARE_KEY = Symbol('middlewares');

export const Middleware = (
	...middlewares: RequestHandler[]
): MethodDecorator => {
	return (target, propertyKey, _descriptor) => {
		Reflect.defineMetadata(
			MIDDLEWARE_KEY,
			middlewares,
			target,
			propertyKey
		);
	};
};

export const getMiddlewares = (
	target: any,
	propertyKey: string | symbol
): RequestHandler[] => {
	return Reflect.getMetadata(MIDDLEWARE_KEY, target, propertyKey) || [];
};
