import 'dotenv/config';
import http from 'http';
import application from './utils/application';
import { AppdataSource } from './database';
const server = http.createServer(application.instance);

(async () => {
	await AppdataSource.initialize()
		.then(() => console.log('Database connected'))
		.catch((error: Error) =>
			console.log(`${error.message}: ${error.stack}`)
		);

	await server.listen(3001, () => {
		console.log('Server running on port 3001');
	});
})();
