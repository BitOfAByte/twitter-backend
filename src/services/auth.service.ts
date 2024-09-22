import { User } from '@App/database/models/User.entity';
import UserDTO from '@App/dto/User.dto';
import { createAccessToken, sendRefreshToken } from '@App/utils/auth/auth';
import Service from '@App/utils/decorators/service.decorators';
import { compare } from 'bcryptjs';
import { Response } from 'express';

@Service()
export default class AuthService {
	async logout(id: number) {
		const user = await User.findOne({ where: { id } });
		if (!user) return null;
		return user;
	}
	public async getProfile(id: any) {
		const user = await User.findOne({ where: { id } });
		if (!user) return null;
		return user;
	}

	public async login(user: UserDTO, res: Response) {
		const usr = await User.findOne({
			where: {
				email: user.email,
			},
		});

		if (!usr) return null;
		const validPassword = await compare(user.password, usr.password);
		if (!validPassword) return null;

		const accessToken = createAccessToken(usr);
		sendRefreshToken(res, accessToken);

		return {
			accessToken,
			message: `Welcome, ${usr.username}`,
		};
	}
}
