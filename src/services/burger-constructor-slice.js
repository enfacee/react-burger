import { createSlice, nanoid } from '@reduxjs/toolkit'
import { burgerApi } from './burgerApi'


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
            prepare: (ingredient) => {
                return { payload: { ...ingredient, key: nanoid() }}
            }
        },
        removeIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.key !== action.payload)
        },
        moveIngredient: (state, action) => {
            state.ingredients.splice(action.payload.hoverIndex, 0, state.ingredients.splice(action.payload.dragIndex, 1)[0]);
        }
    },
    extraReducers: (builder) => {
      builder.addMatcher(burgerApi.endpoints.sendOrder.matchFulfilled,
        (state)=> {
            state.ingredients = []
            state.bun = null
        }
      )
    }
  })
  
  export const { addBun, addIngredient, removeIngredient, moveIngredient } = burgerContructorSlice.actions;