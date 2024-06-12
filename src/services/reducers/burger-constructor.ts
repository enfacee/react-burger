import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { TIngredient } from '../../types/ingredient'
import { TIngredientResponse } from '../../types/response';

type TBurgerConstructor = {
    bun: TIngredientResponse | null;
    ingredients: Array<TIngredient>;
}

const initialState: TBurgerConstructor = {
    bun: null,
    ingredients: []
  }
  
  export const burgerContructorSlice = createSlice({
    name: 'burgerContructor',
    initialState,
    reducers: {
        addBun: (state, action) => {
            state.bun = action.payload
        },
        addIngredient: {
            reducer: (state, action: PayloadAction<TIngredient>) => {
                state.ingredients.push(action.payload)
            },
            prepare: (ingredient: TIngredient) => {
                return { payload: { ...ingredient, key: nanoid() }}
            }
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.key !== action.payload)
        },
        moveIngredient: (state, action: PayloadAction<{hoverIndex: number; dragIndex: number}>) => {
            state.ingredients.splice(action.payload.hoverIndex, 0, state.ingredients.splice(action.payload.dragIndex, 1)[0]);
        },
        clearConstructor:(state) => {
            state.ingredients = []
            state.bun = null
        },
    },
  })
  
  export const { addBun, addIngredient, removeIngredient, moveIngredient, clearConstructor } = burgerContructorSlice.actions;