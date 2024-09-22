import { User } from '@App/database/models/User.entity';

export default class PostDTO {
	title!: string;
	text!: string;
	points!: number;
	creatorId: number;
	creator: User;
}
