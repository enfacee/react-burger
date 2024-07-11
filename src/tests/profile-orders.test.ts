import { initialState, profileOrdersSlice, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../services/reducers/profile-orders";
import { WebsocketStatus } from "../types/orders";
import { ordersFeed } from "./feed-orders.test";


describe('profile-orders reducer', () => {
    it('initialize correctly', () => {
        const state = profileOrdersSlice.reducer(undefined, { type : ""})
        expect(state).toEqual(initialState);
    })

    it('ws connection', () => {
        const action = { type: wsConnecting.type };
        const state = profileOrdersSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, status: WebsocketStatus.CONNECTING});
    })

    it('ws open', () => {
        const action = { type: wsOpen.type };
        const state = profileOrdersSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, status: WebsocketStatus.ONLINE});
    })

    it('ws close', () => {
        const action = { type: wsClose.type };
        const state = profileOrdersSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, status: WebsocketStatus.OFFLINE});
    })

    it('ws error', () => {
        const action = { type: wsError.type, payload: "error" };
        const state = profileOrdersSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, connectionError: "error"});
    })

    it('ws message', () => {
        const action = { type: wsMessage.type, payload: ordersFeed };
        const state = profileOrdersSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, orders: ordersFeed.orders});
    })
})