import { getOrderByNumber, sendOrder } from "../services/actions/order";
import { TOrderState, clearOrder, initialState, orderSlice } from "../services/reducers/order";
import { TOrderResponse, TOrdersFeedResponse } from "../types/response";
import { order1 } from "./feed-orders.test";

const orderReponse: TOrderResponse = {
    name: 'order',
    order: {
        number: 101
    },
    success: true
}
const loadedState: TOrderState = {
    loading: true, 
    order: orderReponse, 
    success: true, 
    currentOrder: null
}

const orderFeed: TOrdersFeedResponse = {
    success: true,
    orders: [order1],
    total: 0,
    totalToday: 0
}

describe('orders reducer', () => {
    it('initialize correctly', () => {
        const state = orderSlice.reducer(undefined, { type : ""})
        expect(state).toEqual(initialState);
    })

    it('clear order', () => {
        const action = { type: clearOrder.type };
        const state = orderSlice.reducer(loadedState, action);
        expect(state).toEqual({...initialState, loading: false, order: null, success: null});
    })

    it('sendOrder pending', () => {
        const action = { type: sendOrder.pending.type };
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: true});
    })

    it('sendOrder rejected', () => {
        const action = { type: sendOrder.rejected.type };
        const state = orderSlice.reducer(loadedState, action);
        expect(state).toEqual({...initialState, loading: false, order: null, success: false});
    })

    it('sendOrder fulfilled', () => {
        const action = { type: sendOrder.fulfilled.type, payload: orderReponse };
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, loading: false, order: orderReponse, success: true});
    })

    it('getOrderByNumber fulfilled', () => {
        const action = { type: getOrderByNumber.fulfilled.type, payload: orderFeed };
        const state = orderSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, currentOrder: order1});
    })
})