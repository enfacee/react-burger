import { createSlice } from '@reduxjs/toolkit'
import { getIngredients } from '../actions/ingredients'

const initialState = {
    loading: false,
    success: null,
    ingredients: []
}
  
export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        addBun: (state, action) => {
            state.bun = action.payload
        },
        removeIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.key !== action.payload)
        },
        moveIngredient: (state, action) => {
            state.ingredients.splice(action.payload.hoverIndex, 0, state.ingredients.splice(action.payload.dragIndex, 1)[0]);
        }
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
                .addCase(getIngredients.fulfilled, (state, {payload}) => {
                    state.loading = false;
                    state.success = true;
                    state.ingredients = payload;
                })      
    }
})
  
  export const { addBun, addIngredient, removeIngredient, moveIngredient } = ingredientsSlice.actions;