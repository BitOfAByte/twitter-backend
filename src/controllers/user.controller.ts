import UserService from '@App/services/User.service';
import Controller from '@App/utils/decorators/controller.decorator';
import { Get } from '@App/utils/decorators/handlers.decorator';
import { Request, Response } from 'express';

@Controller('/users')
export default class UserController {
	private userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	@Get('')
	public async getUsers(_req: Request, res: Response) {
		try {
			const users = await this.userService.getUsers();
			res.status(200).json({ users });
		} catch (err) {
			res.status(500).json({ error: `Internal server error: ${err}` });
		}
	}

	@Get('/:id')
	public async getUserById(req: Request, res: Response) {
		try {
			const user = await this.userService.getUserById(
				parseInt(req.params.id)
			);
			res.status(200).json({ user });
		} catch (err) {
			res.status(500).json({ error: `Internal server error: ${err}` });
		}
	}
}
