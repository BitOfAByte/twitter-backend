import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	OneToMany,
} from 'typeorm';
import { Post } from './Post.entity';
import { Updoot } from './Updoot.entity';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ unique: true, type: 'varchar' })
	username!: string;

	@Column({ unique: true, type: 'varchar' })
	email!: string;

	@Column()
	password!: string;

	@OneToMany(() => Post, (post) => post.creator)
	posts: Post[];

	@OneToMany(() => Updoot, (updoot) => updoot.user)
	updoots: Updoot[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
