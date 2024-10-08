import { Entity, BaseEntity, ManyToOne, PrimaryColumn, Column } from 'typeorm';
import { User } from './User.entity';
import { Post } from './Post.entity';

// m to n
// many to many
// user <-> posts
// user -> join table <- posts
// user -> updoot <- posts

@Entity()
export class Updoot extends BaseEntity {
	@Column({ type: 'int' })
	value: number;

	@PrimaryColumn({ type: 'int' })
	userId: number;

	@ManyToOne(() => User, (user) => user.updoots)
	user: User;

	@PrimaryColumn({ type: 'int' })
	postId: number;

	@ManyToOne(() => Post, (post) => post.updoots, {
		onDelete: 'CASCADE',
	})
	post: Post;
}
