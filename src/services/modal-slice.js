import { createSlice } from '@reduxjs/toolkit'
import { burgerApi } from './burgerApi'

const initialState = {
  ingredientDetails: null,
  showedDetailsModal: false,
  showOrderModal: false,
  orderInfo: null
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showInfo: (state, action) => {
        state.ingredientDetails = action.payload
        state.showedDetailsModal = true
    },
    closeModal: (state) => {
        state.ingredientDetails = null
        state.showedDetailsModal = false
        state.showOrderModal = false
        state.orderInfo = null
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      burgerApi.endpoints.getIngredients.matchFulfilled,
      (state, {payload}) => {

      }
    )
    builder.addMatcher(burgerApi.endpoints.sendOrder.matchFulfilled,
      (state, {payload})=> {
          state.showOrderModal = true
          state.orderInfo = payload
      }
    )
  }
})

export const { showInfo, closeModal } = modalSlice.actions;