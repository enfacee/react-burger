import { nanoid } from "@reduxjs/toolkit";
import { feedOrdersSlice, initialState, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../services/reducers/feed-orders";
import { OrderStatusEnum, TOrder, WebsocketStatus } from "../types/orders";
import { TOrdersFeedResponse } from "../types/response";

export const order1: TOrder = {
    _id: nanoid(),
    ingredients: [nanoid(), nanoid()],
    status: OrderStatusEnum.DONE,
    name: 'order1',
    number: 1,
    createdAt: '',
    updateAt: ''
}
const order2: TOrder = {
    _id: nanoid(),
    ingredients: [nanoid(), nanoid(), nanoid(), nanoid(), nanoid(), nanoid()],
    status: OrderStatusEnum.DONE,
    name: 'order2',
    number: 2,
    createdAt: '',
    updateAt: ''
}
const order3: TOrder = {
    _id: nanoid(),
    ingredients: [nanoid(), nanoid(), nanoid(), nanoid()],
    status: OrderStatusEnum.PENDING,
    name: 'order3',
    number: 3,
    createdAt: '',
    updateAt: ''
}

export const ordersFeed: TOrdersFeedResponse = {
    success: true,
    orders: [order1, order2, order3],
    total: 2,
    totalToday: 2
}


describe('feed-orders reducer', () => {
    it('initialize correctly', () => {
        const state = feedOrdersSlice.reducer(undefined, { type : ""})
        expect(state).toEqual(initialState);
    })

    it('ws connection', () => {
        const action = { type: wsConnecting.type };
        const state = feedOrdersSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, status: WebsocketStatus.CONNECTING});
    })

    it('ws open', () => {
        const action = { type: wsOpen.type };
        const state = feedOrdersSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, status: WebsocketStatus.ONLINE});
    })

    it('ws close', () => {
        const action = { type: wsClose.type };
        const state = feedOrdersSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, status: WebsocketStatus.OFFLINE});
    })

    it('ws error', () => {
        const action = { type: wsError.type, payload: "error" };
        const state = feedOrdersSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, connectionError: "error"});
    })

    it('ws message', () => {
        const action = { type: wsMessage.type, payload: ordersFeed };
        const state = feedOrdersSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, total: 2, totalToday: 2, orders: ordersFeed.orders, success: [1, 2], pending: [3]});
    })
})