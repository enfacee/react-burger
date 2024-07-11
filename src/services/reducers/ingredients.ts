import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getIngredients } from '../actions/ingredients'
import { TIngredientResponse } from '../../types/response';

type TIngredientState = {
    loading: boolean;
    success: boolean | null;
    ingredients: Array<TIngredientResponse>
}

export const initialState: TIngredientState = {
    loading: false,
    success: null,
    ingredients: []
}
  
export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getIngredients.pending, (state) => {
                    state.loading = true;
                })
                .addCase(getIngredients.rejected, (state) => {
                    state.loading = false;
                    state.success = false;
                    state.ingredients = [];
                })
                .addCase(getIngredients.fulfilled, (state, {payload}: PayloadAction<Array<TIngredientResponse>>) => {
                    state.loading = false;
                    state.success = true;
                    state.ingredients = payload;
                })      
    }
})