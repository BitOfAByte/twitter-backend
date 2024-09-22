import { Request, Response } from 'express';
import { Post, Get } from '@App/utils/decorators/handlers.decorator';
import Controller from '@App/utils/decorators/controller.decorator';
import AuthService from '@App/services/auth.service';
import { isAuth } from '@App/middleware/isAuth';
import { Middleware } from '@App/utils/decorators/middleware.decorator';
import { UserRequest } from '@App/utils/types/UserRequest.type';

@Controller('/auth')
export default class AuthController {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	@Post('/login')
	public async login(req: Request, res: Response) {
		if (!req.body.email || !req.body.password)
			return res.status(400).json({ error: 'Missing required fields' });
		if (req.method !== 'POST')
			return res.status(405).json({ error: 'Method not allowed' });
		try {
			const user = await this.authService.login(req.body, res);
			if (!user)
				return res.status(401).json({ error: 'Invalid credentials' });
			return res.status(201).json({ user });
		} catch (err) {
			return res
				.status(500)
				.json({ error: `Internal server error: ${err}` });
		}
	}

	@Get('/profile')
	@Middleware(isAuth)
	public async getProfile(req: UserRequest, res: Response) {
		try {
			const profile = await this.authService.getProfile(req.user!.id);
			return res.status(200).json({ profile });
		} catch (err) {
			return res
				.status(500)
				.json({ error: `Internal server error: ${err}` });
		}
	}
}
