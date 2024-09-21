import { User } from '@App/database/models/User.entity';
import { Request } from 'express';

export interface UserRequest extends Request {
	user?: User;
}
