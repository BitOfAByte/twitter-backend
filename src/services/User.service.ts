import { User } from '@App/database/models/User.entity';
import UserDTO from '@App/dto/User.dto';
import Service from '@App/utils/decorators/service.decorators';
import { hash } from 'bcryptjs';

@Service()
export default class UserService {
	public getUsers(): Promise<User[] | null> {
		return User.find();
	}

	public getUserById(id: number): Promise<User | null> {
		return User.findOne({ where: { id } });
	}

	public async createUser(user: UserDTO): Promise<User | null> {
		let password = user.password;
		password = await hash(user.password, 10);
		const usr = await User.create({
			email: user.email,
			username: user.username,
			password,
		}).save();
		return usr;
	}

	public async updateUser(id: number, user: UserDTO): Promise<User | null> {
		const usr = await User.findOne({ where: { id } });
		if (!usr) return null;
		await User.update({ id }, user);
		const updatedUser = await User.findOne({ where: { id } });
		return updatedUser;
	}

	public async deleteUser(id: number): Promise<boolean> {
		const usr = await User.findOne({ where: { id } });
		if (!usr) return false;
		await User.delete({ id });
		return true;
	}
}
