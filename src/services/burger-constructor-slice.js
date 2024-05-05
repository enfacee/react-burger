import { createSlice, nanoid } from '@reduxjs/toolkit'


const initialState = {
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
            reducer: (state, action) => {
                state.ingredients.push(action.payload)
                state.showedDetailsModal = false
            },
            prepare: (ingridient) => {
                return { payload: { ...ingridient, key: nanoid() }}
            }
        },
        removeIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(ingridient => ingridient.key !== action.payload)
        },
        moveIngredient: (state, action) => {

        }
    }
  })
  
  export const { addBun, addIngredient, removeIngredient, moveIngredient } = burgerContructorSlice.actions;