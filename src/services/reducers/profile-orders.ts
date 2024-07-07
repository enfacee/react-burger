import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TOrder, WebsocketStatus } from "../../types/orders";
import { TOrdersFeedResponse } from "../../types/response";

type TProfileOrdersState = {
    status: WebsocketStatus,
    orders: Array<TOrder>,
    connectionError: string | null
}

const initialState : TProfileOrdersState = {
    status: WebsocketStatus.OFFLINE,
    orders: [],
    connectionError: null
}
export const profileOrdersSlice = createSlice({
    name: "profileOrders",
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
        wsMessage: (state, action: PayloadAction<TOrdersFeedResponse>) => {            
            state.orders = action.payload.orders;
        }
    },
})

export const {wsConnecting, wsOpen, wsClose, wsError, wsMessage} = profileOrdersSlice.actions;