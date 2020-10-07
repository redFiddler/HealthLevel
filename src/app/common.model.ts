export class APIResponse {
    code: number;
    meta: any;
    data: any;
}

export class PostModel {
	id: number;
	user_id: string;
	title: string;
	body: string;
	created_at: string;
	updated_at: string
}

export class CommentModel {
	id: number;
	post_id: string;
	name: string;
    email: string;
    body: string;
	created_at: string;
	updated_at: string
}

export class UserModel {
	created_at: string;
	email: string;
	gender: string;
	id: number;
	name: string;
	status: string;
	updated_at: string;
}

export class ErrorModel {
	field: string;
	message: string
}