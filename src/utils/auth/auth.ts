import { sign } from 'jsonwebtoken';
import { Response } from 'express';
import { User } from '@App/database/models/User.entity';

export const sendRefreshToken = (res: Response, token: string) => {
	res.cookie('jid', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production' ? true : false,
		sameSite: 'strict',
	});
};

export const createAccessToken = (user: User) => {
	return sign(
		{
			id: user.id,
			username: user.username,
			email: user.email,
		},
		process.env.SECRET_KEY!,
		{
			expiresIn: '15m',
		}
	);
};

export const createRefreshToken = (user: User) => {
	return sign(
		{
			id: user.id,
			username: user.username,
			email: user.email,
		},
		process.env.REFRESH_TOKEN!,
		{
			expiresIn: '7d',
		}
	);
};

export const handleLogout = (res: Response, token: string) => {
	res.cookie('jid', token, {
		expires: new Date(Date.now()),
	});
};
