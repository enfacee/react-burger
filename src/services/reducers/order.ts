import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { sendOrder } from '../actions/order';
import { TOrderResponse } from '../../types/response';

type TOrderState = {
    loading: boolean;
    success: boolean | null;
    order: TOrderResponse | null;
}

const initialState: TOrderState = {
    loading: false,
    success: null,
    order: null,
}
  
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
		clearOrder: (state) => {
			state.loading = false;
			state.order = null;
			state.success = null;
		},
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendOrder.rejected, (state) => {
                state.loading = false;
                state.success = false;
                state.order = null;
            })
            .addCase(sendOrder.fulfilled, (state, {payload}: PayloadAction<TOrderResponse>) => {
                state.loading = false;
                state.success = payload.success;
                state.order = payload;
            })      
    }
})
  
  export const { clearOrder } = orderSlice.actions;