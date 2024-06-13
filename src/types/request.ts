export type TRegisterRequest = {
	email: string;
	name: string;
	password: string;
}

export type TLoginRequest = {
	email: string;
	password: string;
}

export type TForgotPasswordRequest = {
	email: string;
}

export type TResetPasswordRequest = {
	password: string;
	token: string;
}

export type RequestOptions = {
	method: 'GET' | 'POST' | 'PATCH';
	headers?: {
		[key: string]: string;
	};
	body?:string;
}