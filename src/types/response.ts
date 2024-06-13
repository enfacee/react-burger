import { TIngredientType, TUser } from "./ingredient";

export type TIngredientResponse = {
	_id: string;
	name: string;
	type: TIngredientType;
	proteins: number;
	price: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	image: string;
	image_large: string;
	image_mobile: string;
}
export type TOrderResponse = {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
	message?: string;
}
export type TUserResponse = {
	success: boolean;
	user: TUser;
	accessToken: string;
	refreshToken: string;
	message?: string;
}
export type TLogoutResponse = {
	success: boolean;
	message: string;
}
export type TRefreshTokenResponse = {
	success: true;
	accessToken: string;
	refreshToken: string;
	message?: string;
};
export type TDataIngredientResponse = {
	success: boolean;
	data: Array<TIngredientResponse>;
	message?: string;
};
export type ResponseType = TDataIngredientResponse | TUserResponse | TLogoutResponse