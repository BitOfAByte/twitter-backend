import { Post } from '@App/database/models/Post.entity';
import PostDTO from '@App/dto/Post.dto';
import Service from '@App/utils/decorators/service.decorators';
import { Repository } from 'typeorm';

@Service()
export default class PostService {
	private readonly postRepo: Repository<Post>;
	async getPosts() {
		return await this.postRepo.find();
	}

	async createPost(body: PostDTO) {
		const post = await this.postRepo.create({ ...body }).save();
		return post;
	}
}
