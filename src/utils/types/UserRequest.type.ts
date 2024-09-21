import { User } from '@App/database/models/User.entity';

export interface UserRequest extends Request {
	user?: User;
	headers: Request['headers'] & {
		authorization?: string;
	};
	body: Request['body'];
}
