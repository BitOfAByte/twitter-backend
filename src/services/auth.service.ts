import { User } from '@App/database/models/User.entity';
import UserDTO from '@App/dto/User.dto';
import { createAccessToken, sendRefreshToken } from '@App/utils/auth/auth';
import Service from '@App/utils/decorators/service.decorators';
import { Response } from 'express';

@Service()
export default class AuthService {
	public async getProfile(id: any) {
		const user = await User.findOne({ where: { id } });
		if (!user) return null;
		return user;
	}
	private res: Response;
	public async login(user: UserDTO) {
		const usr = await User.findOne({
			where: {
				email: user.email,
			},
		});

		if (!usr) return null;
		return {
			accessToken: sendRefreshToken(this.res, createAccessToken(usr)),
			message: `Welcome , ${usr.username}`,
		};
	}
}
