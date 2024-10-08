import express, { Application as ExApplication, Handler } from 'express';
import { controllers } from '@App/controllers';
import { MetadataKeys } from '../utils/metadata.keys';
import { IRouter } from '../utils/decorators/handlers.decorator';
import { getMiddlewares } from '@App/utils/decorators/middleware.decorator';

class Application {
	private readonly _instance: ExApplication;

	get instance(): ExApplication {
		return this._instance;
	}

	constructor() {
		this._instance = express();
		this._instance.use(express.json());
		this.registerRouters();
	}

	private registerRouters() {
		this._instance.get('/', (_req, res) => {
			res.json({ message: 'Hello World!' });
		});

		const info: Array<{ api: string; handler: string }> = [];

		controllers.forEach((controllerClass) => {
			const controllerInstance: { [handleName: string]: Handler } =
				new controllerClass() as any;

			const basePath: string = Reflect.getMetadata(
				MetadataKeys.BASE_PATH,
				controllerClass
			);
			const routers: IRouter[] = Reflect.getMetadata(
				MetadataKeys.ROUTERS,
				controllerClass
			);

			const exRouter = express.Router();

			routers.forEach(({ method, path, handlerName }) => {
				const middlewares = getMiddlewares(
					controllerClass.prototype,
					handlerName
				);
				exRouter[method](
					path,
					...middlewares,
					controllerInstance[String(handlerName)].bind(
						controllerInstance
					)
				);

				info.push({
					api: `${method.toLocaleUpperCase()} ${basePath + path}`,
					handler: `${controllerClass.name}.${String(handlerName)}`,
				});
			});

			this._instance.use(basePath, exRouter);
		});

		console.table(info);
	}
}

export default new Application();
