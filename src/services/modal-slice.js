import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ingridientDetails: null,
  showedDetailsModal: false
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showInfo: (state, action) => {
        state.ingridientDetails = action.payload
        state.showedDetailsModal = true
    },
    closeModal: (state) => {
        state.ingridientDetails = null
        state.showedDetailsModal = false
    },
  },
})

export const { showInfo, closeModal } = modalSlice.actions;