import { nanoid } from "@reduxjs/toolkit";
import { getIngredients } from "../services/actions/ingredients";
import { ingredientsSlice, initialState } from "../services/reducers/ingredients";
import { TIngredientResponse } from "../types/response";
import { ingredient1, ingredient2 } from "./burger-constructor.test";

const ingredients: Array<TIngredientResponse> = [ingredient1, ingredient2];

describe('ingredients reducer', () => {
    it('initialize correctly', () => {
        const state = ingredientsSlice.reducer(undefined, { type : ""})
        expect(state).toEqual(initialState);
    })

    it('getIngredients pending', () => {
        const action = { type: getIngredients.pending.type };
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true});
    })

    it('getIngredients rejected', () => {
        const action = { type: getIngredients.rejected.type };
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: false, success: false, ingredients: []});
    })

    it('getIngredients fulfilled', () => {
        const action = { type: getIngredients.fulfilled.type, payload: ingredients };
        const state = ingredientsSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: false, success: true, ingredients: ingredients});
    })
})