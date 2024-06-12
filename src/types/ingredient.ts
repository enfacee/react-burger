import { TIngredientResponse } from "./response";

export type TIngredientType = 'bun' | 'sauce' | 'main';


export type TIngredient = TIngredientResponse & { key: string; }
export type TUser = {
	email: string;
	name: string;
};
