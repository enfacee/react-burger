import { changeUserInfo, forgotPassword, getUser, login, logout, register, resetPassword } from "../services/actions/user";
import { initialState, userSlice } from "../services/reducers/user";
import { TUser } from "../types/ingredient";

const user: TUser = {
    email: 'email',
    name: 'name'
}
describe('user reducer', () => {
    it('initialize correctly', () => {
        const state = userSlice.reducer(undefined, { type : ""})
        expect(state).toEqual(initialState);
    })

    it('getUser pending', () => {
        const action = { type: getUser.pending.type };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: null, isUserAuth: false});
    })

    it('getUser rejected', () => {
        const action = { type: getUser.rejected.type };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: null, isUserAuth: false});
    })

    it('getUser fulfilled', () => {
        const action = { type: getUser.fulfilled.type, payload: user };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: user, isUserAuth: true});
    })

    it('register fulfilled', () => {
        const action = { type: register.fulfilled.type, payload: user };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: user});
    })

    it('login fulfilled', () => {
        const action = { type: login.fulfilled.type, payload: user };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: user});
    })

    it('logout fulfilled', () => {
        const action = { type: logout.fulfilled.type };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState});
    })

    it('changeUserInfo fulfilled', () => {
        const action = { type: changeUserInfo.fulfilled.type, payload: user };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, user: user});
    })

    it('forgotPassword fulfilled', () => {
        const action = { type: forgotPassword.fulfilled.type };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, tokenSent: true, passwordChanged: false});
    })

    it('resetPassword fulfilled', () => {
        const action = { type: resetPassword.fulfilled.type };
        const state = userSlice.reducer(initialState, action);
        expect(state).toEqual({...initialState, passwordChanged: true});
    })
})