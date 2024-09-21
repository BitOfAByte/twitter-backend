import 'reflect-metadata';

const Service = (): ClassDecorator => {
	return (target) => {
		Reflect.defineMetadata('service', true, target);
	};
};

export default Service;
