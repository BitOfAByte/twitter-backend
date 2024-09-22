import { isAuth } from '@App/middleware/isAuth';
import PostService from '@App/services/posts/post.service';
import Controller from '@App/utils/decorators/controller.decorator';
import { Get, Post } from '@App/utils/decorators/handlers.decorator';
import { Middleware } from '@App/utils/decorators/middleware.decorator';
import { Request, Response } from 'express';

@Controller('/posts')
export default class PostController {
	private readonly postService: PostService;
	constructor() {
		this.postService = new PostService();
	}

	@Get('')
	public async getPosts(_req: Request, res: Response) {
		try {
			const posts = await this.postService.getPosts();
			res.status(200).json({ posts });
		} catch (err) {
			res.status(500).json({ error: `Internal server error: ${err}` });
		}
	}

	@Post('/create')
	@Middleware(isAuth)
	public async createPost(req: Request, res: Response) {
		if (!req.body.title || !req.body.content)
			return res.status(400).json({ error: 'Missing required fields' });

		try {
			const post = await this.postService.createPost(req.body);
			return res.status(201).json({ post });
		} catch (err) {
			return res
				.status(500)
				.json({ error: `Internal server error: ${err}` });
		}
	}
}
