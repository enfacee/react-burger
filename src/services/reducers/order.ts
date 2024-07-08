import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getOrderByNumber, sendOrder } from '../actions/order';
import { TOrderResponse, TOrdersFeedResponse } from '../../types/response';
import { TOrder } from '../../types/orders';

type TOrderState = {
    loading: boolean;
    success: boolean | null;
    order: TOrderResponse | null;
    currentOrder: TOrder | null;
}

const initialState: TOrderState = {
    loading: false,
    success: null,
    order: null,
    currentOrder: null
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
            .addCase(getOrderByNumber.fulfilled, (state, {payload}: PayloadAction<TOrdersFeedResponse>) => {
                state.currentOrder = payload.orders.length > 0 ? payload.orders[0] : null;
            })   
    }
})
  
  export const { clearOrder } = orderSlice.actions;