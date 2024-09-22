import { Post } from '@App/database/models/Post.entity';
import { Updoot } from '@App/database/models/Updoot.entity';
import PostDTO from '@App/dto/Post.dto';
import Service from '@App/utils/decorators/service.decorators';
import { Repository } from 'typeorm';

@Service()
export default class PostService {
	private readonly postRepo: Repository<Post>;
	private readonly updootRepo: Repository<Updoot>;
	async getPosts() {
		return await this.postRepo.find();
	}

	async createPost(body: PostDTO) {
		const post = await this.postRepo.create({ ...body }).save();
		return post;
	}

	async deletePost(id: number) {
		const post = await this.postRepo.delete(id);
		if (!post) return null;
		return post;
	}

	async updatePost(id: number, body: PostDTO) {
		const post = await this.postRepo.findOne({ where: { id } });
		if (!post) return null;
		await this.postRepo.update(id, { ...body });
		return post;
	}

	async getPost(id: number) {
		const post = await this.postRepo.findOne({ where: { id } });
		if (!post) return null;
		return post;
	}

	async votePost(postId: number, userId: number, value: number) {
		const isUpvote = value === 1;
		const realValue = isUpvote ? 1 : -1;
		const updoot = await this.updootRepo.findOne({
			where: { postId, userId },
		});

		// If the user has already voted on this post
		if (updoot) {
			// If the vote is the same, do nothing
			if (updoot.value === realValue) {
				return null;
			}

			// If the vote is different, update the vote
			updoot.value = realValue;
			await this.updootRepo.save(updoot);

			const post = await this.postRepo.findOne({
				where: { id: postId },
			});
			if (post) {
				post.points += 2 * realValue;
				await this.postRepo.save(post);
			}
		} else {
			// If the user hasn't voted on this post, create a new vote
			const newUpdoot = this.updootRepo.create({
				userId,
				postId,
				value: realValue,
			});
			await this.updootRepo.save(newUpdoot);

			const post = await this.postRepo.findOne({
				where: { id: postId },
			});
			if (post) {
				post.points += realValue;
				await this.postRepo.save(post);
			}
		}

		const updatedPost = await this.postRepo.findOne({
			where: { id: postId },
		});
		return updatedPost;
	}
}
