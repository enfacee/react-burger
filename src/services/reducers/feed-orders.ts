import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderStatusEnum, TOrder, TOrdersFeed, WebsocketStatus } from "../../types/orders";

type TFeedOrdersState = {
    status: WebsocketStatus,
    orders: Array<TOrder>,
    connectionError: string | null,
    success: Array<number>,
    pending: Array<number>,
    total: number,
    totalToday: number
}

const initialState : TFeedOrdersState = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    connectionError: null,
    success: [],
    pending: [],
    total: 0,
    totalToday: 0
}
export const feedOrdersSlice = createSlice({
    name: "feedOrders",
    initialState,
    reducers: {
        wsConnecting: (state) => {
            state.status = WebsocketStatus.CONNECTING;
        },
        wsOpen: (state) => {
            state.status = WebsocketStatus.ONLINE;
            state.connectionError = null;
        },
        wsClose: (state) => {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<TOrdersFeed>) => {
            state.orders = action.payload.orders.filter(order => order.ingredients.length > 0);
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
            state.success = state.orders.filter(order => order.status === OrderStatusEnum.DONE).slice(0, 20).map(order => order.number);
            state.pending = state.orders.filter(order => order.status === OrderStatusEnum.PENDING).slice(0, 20).map(order => order.number);
        }
    },
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = feedOrdersSlice.actions;