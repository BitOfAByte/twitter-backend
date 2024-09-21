import { User } from '@App/database/models/User.entity';
import Service from '@App/utils/decorators/service.decorators';

@Service()
export default class UserService {
	public getUsers(): Promise<User[] | null> {
		return User.find();
	}

	public getUserById(id: number): Promise<User | null> {
		return User.findOne({ where: { id } });
	}
}
