import { nanoid } from "@reduxjs/toolkit"
import { TIngredientResponse } from "../types/response"
import { addBun, addIngredient, burgerContructorSlice, clearConstructor, initialState, moveIngredient, removeIngredient } from "../services/reducers/burger-constructor"
import { TIngredient } from "../types/ingredient"

const bun: TIngredientResponse = {
    _id: nanoid(),
    name: 'bun',
    type: 'bun',
    proteins: 0,
    price: 100,
    fat: 0,
    carbohydrates: 0,
    calories: 100,
    image: 'image',
    image_large: 'image',
    image_mobile: 'image'
}

export const ingredient1: TIngredient = {
    key: "1",
    _id: nanoid(),
    name: 'ingredient',
    type: 'main',
    proteins: 0,
    price: 150,
    fat: 0,
    carbohydrates: 0,
    calories: 100,
    image: 'image',
    image_large: 'image',
    image_mobile: 'image'
}
export const ingredient2: TIngredient = {
    key: "2",
    _id: nanoid(),
    name: 'ingredient',
    type: 'main',
    proteins: 0,
    price: 150,
    fat: 0,
    carbohydrates: 0,
    calories: 100,
    image: 'image',
    image_large: 'image',
    image_mobile: 'image'
}

describe('burger-constructor reducer', () => {
    it('initialize correctly', () => {
        const state = burgerContructorSlice.reducer(undefined, { type : ""})
        expect(state).toEqual(initialState);
    })

    it('add bun', () => {
        const action = { type: addBun.type, payload: bun };
        const state = burgerContructorSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, bun: bun});
    })

    it('add ingredient', () => {
        const action = { type: addIngredient.type, payload: ingredient1 };
        const state = burgerContructorSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, ingredients: [ingredient1]});
    })

    it('remove ingredient', () => {
        const action = { type: removeIngredient.type, payload: "1" };
        const state = burgerContructorSlice.reducer({bun: null, ingredients: [ingredient1]}, action);
        expect(state).toEqual(initialState);
    })

    it('move ingredient', () => {
        const action = { type: moveIngredient.type, payload: {hoverIndex: 0, dragIndex: 1} };
        const state = burgerContructorSlice.reducer({bun: null, ingredients: [ingredient1, ingredient2]}, action);
        expect(state).toEqual({bun: null, ingredients: [ingredient2, ingredient1]});
    })

    it('clear constructor', () => {
        const action = { type: clearConstructor.type };
        const state = burgerContructorSlice.reducer({bun: bun, ingredients: [ingredient1]}, action);
        expect(state).toEqual(initialState);
    })
})