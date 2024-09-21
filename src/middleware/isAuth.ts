import { UserRequest } from '@App/utils/types/UserRequest.type';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const isAuth = (req: UserRequest, res: Response, next: NextFunction) => {
	const authorization = req.headers['authorization'];
	if (!authorization)
		return res.status(401).json({ message: 'Unauthorized' });
	try {
		const token = authorization.split(' ')[1];
		const payload = verify(token, process.env.SECRET_KEY!);
		req.user = payload as any;
	} catch (error) {
		console.log(error);
		return res.status(401).json({ message: 'Unauthorized' });
	}
	return next();
};
